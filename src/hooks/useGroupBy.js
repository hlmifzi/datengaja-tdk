import cloneDeep from "lodash/cloneDeep"
import { useState, useEffect } from "react";
import { useAdvanceFilter } from "context/AdvanceFilterContext";
import { useHeaderFilter } from "context/HeaderFilterContext";
import { useImmer } from "use-immer";
import { getListObjectives, getObjectiveCategory } from "client/ObjectivesClient";

const payloadTemplate = {
  goals: [],
  visible: true,
  expanded: false,
  olderThan: null,
  isLoading: true,
  isLoaded: false,
}

// deprecate if backend support listing only objective w/ child
const getGroupedTaksByParent = async (objectives) => {
  let grouped = []
  grouped.push({group: "No Parent", goals: [], visible: false})
  grouped.push({group: "No Visible Parent", goals: [], visible: false})
  let groupIndex = {};

  objectives.map(task => {
    if(!task.hasOwnProperty("parent")) {
      if (!grouped[1].visible) grouped[1].visible = true
      grouped[1].goals.push(task)
    } else {
      parent = task.parent ? cloneDeep(task.parent) : false;

      if (!parent) {
        if (!grouped[0].visible) grouped[0].visible = true
        grouped[0].goals.push(task);
      } else {
        const indexOfParent = groupIndex[parent.name];
        if (indexOfParent == null) {
          const index = grouped.push({group: parent.name, goals: [task], visible: true}) - 1;
          groupIndex[parent.name] = index;
        } else {
          grouped[indexOfParent].goals.push(task);
        }
      }
    }
  });

  grouped.push(...grouped.splice(0, 2))
  return grouped
}

const getGoalTypes = async (groupIndex, prevGrouped, params) => {
  const { data } = await getObjectiveCategory(params);
  const shouldLoad = [];

  let grouped = [];
  if (!params?.type || params?.type?.includes("goal")) {
    grouped = data.map((type, index) => {
      let expanded = {};
      if (type.name in groupIndex) {
        expanded.expanded = prevGrouped[groupIndex[type.name]].expanded
        shouldLoad.push(index)
      }

      return {
        ...payloadTemplate,
        ...expanded,
        group: type.name,
        params: { objectiveCategoryId: type.id, type: ["annual_goal", "goal"] },
      }
    })
  }

  if (!params?.type || params?.type?.includes("task")) {
    grouped.push({
      ...payloadTemplate,
      group: "No Goal Type",
      params: { type: ["task"] }
    })

    if (prevGrouped?.[groupIndex?.["No Goal Type"]]?.expanded) {
      shouldLoad.push(grouped.length - 1)
    }
  }

  return { grouped, shouldLoad }
}

const useGroupBy = (objectives, additionalParams = {}) => {
  const { groupBy, advanceFilter } = useAdvanceFilter();
  let headerFilter = null;
  try { headerFilter = useHeaderFilter()?.headerFilter }
  catch (error) { console.log("Expected Error: The parent component doesn't use HeaderFilterContext") }

  const mainParams = {
    limit: 15,
    ...advanceFilter,
    ...headerFilter,
    ...additionalParams,
  }

  const [loadingGroup, setLoadingGroup] = useState(false);
  const [groupedObjectives, setGroupedObjectives] = useImmer([]);
  const groupIndex = groupedObjectives.reduce((result, { group }, index) => {
    result[group] = index
    return result
  }, {})

  const getGroupedObjectives = async () => {
    let grouped;
    setLoadingGroup(true)
    switch (groupBy) {
      case "top-parent":
        grouped = await getGroupedTaksByParent(objectives)
        break;
      case "goal-type":
        let data = await getGoalTypes(groupIndex, groupedObjectives, mainParams);
        grouped = data.grouped
        await Promise.all(
          data.shouldLoad.map( async (groupIdx) => {
            const { data, pagination } = await getListObjectives({
              ...mainParams, ...grouped[groupIdx].params
            });

            if (data?.length > 0) grouped[groupIdx].goals = data;
            grouped[groupIdx].olderThan = pagination.next.olderThan;
            grouped[groupIdx].isLoading = false;
          })
        )
        break;
    }
    setLoadingGroup(false)
    setGroupedObjectives(draft => grouped)
  }

  const loadObjectives = async (index, { olderThan } = {}) => {
    const params = {
      ...mainParams,
      ...groupedObjectives[index].params,
      ...(olderThan && { olderThan: olderThan })
    }

    setGroupedObjectives(draft => {

      if (olderThan) {
        draft[index].onLoadMore = true
      } else {
        draft[index].isLoading = true
        draft[index].expanded = !groupedObjectives[index].expanded
      }
    })
    const { data, pagination } = await getListObjectives(params);
    setGroupedObjectives(draft => {
      if (olderThan) {
        draft[index].onLoadMore = false
      } else {
        draft[index].isLoading = false
      }

      if (data?.length > 0) {
        if (olderThan) {
          draft[index].goals.push(...data)
        } else {
          draft[index].goals = data
        }
      }

      draft[index].olderThan = pagination.next.olderThan
      draft[index].isLoaded = true
    })
  }

  const toggleExpanded = (index) => {
    if (groupBy === "top-parent") return

    if (!groupedObjectives[index].isLoaded) {
      loadObjectives(index)
    } else {
      setGroupedObjectives(draft => {
        draft[index].expanded = !groupedObjectives[index].expanded
      })
    }
  }

  useEffect(() => {
    getGroupedObjectives()
  }, [groupBy, objectives, advanceFilter, headerFilter])

  return { groupedObjectives, loadingGroup, toggleExpanded, loadObjectives };
}

export default useGroupBy;