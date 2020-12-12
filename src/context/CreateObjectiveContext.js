import React, { useState, useContext, useEffect } from "react";
import produce from "immer";
import moment from "moment";
import { createMultipleObjective, createTeam } from "client/ObjectivesClient";
import { useUser } from "context/UserContext";
import { useMetrics } from "context/MetricsContext";
import { useParams, useHistory } from "react-router-dom";
import AmplitudeUtils from "src/library/utils/AmplitudeUtils"

const uuidv4 = require("uuid/v4");

const CreateObjectiveContext = React.createContext();

function onChangeAction(id, newValue, currentList) {
  currentList.map((list, index) => {
    if (list.id != id) {
      if (list.children) {
        onChangeAction(id, newValue, list.children);
      }
    } else {
      currentList[index] = { ...list, ...newValue };
    }
  });
  return currentList;
}

function onChangeObjective(id, newValue, currentList) {
  currentList.map((list, index) => {
    if (list.id != id) {
      if (list.children) {
        onChangeObjective(id, newValue, list.children);
      }
    } else {
      currentList[index] = newValue;
    }
  });
  return currentList;
}

function newGoal(fakeParentId, newMeasurement, objectiveCategoryId, config, level) {
  let isTeam = location.pathname.includes("/team") && level === 0;
  const {
    defaultObjectiveVisibilityOption,
    defaultPeriodOnCreate,
    defaultRollupForParentObjective
  } = config;
  const id = uuidv4();
  const type = location.pathname.includes("task") ? "task" : "goal";
  let obj = {
    id: id,
    name: "",
    description: "",
    fakeParentId: fakeParentId,
    isPrivate: defaultObjectiveVisibilityOption.includes("private"),
    isCompanyGoal: false,
    isProject: false,
    weight: 0,
    startDate: moment()
      .startOf(defaultPeriodOnCreate)
      .toISOString(),
    dueDate: moment()
      .endOf(defaultPeriodOnCreate)
      .toISOString(),
    involvements: [],
    tags: [],
    complexity: 1,
    type: type,
    measurement: { ...newMeasurement },
    isShowAdvanced: false,
  };

  if (objectiveCategoryId) {
    obj.objectiveCategoryId = objectiveCategoryId;
  }

  if (fakeParentId === null) {
    obj.measurement.rollUp = defaultRollupForParentObjective
  }

  if (isTeam) {
    obj = {
      id: id,
      name: "",
      fakeParentId: null,
      involvements: [],
      children: [],
      visibility: "public_team"
    };
  }

  return obj;
}

function newSubGoal(fakeParentId, newMeasurement, objectiveCategoryId, config) {
  const {
    defaultObjectiveVisibilityOption,
    defaultPeriodOnCreate,
    defaultRollupForParentObjective
  } = config;
  const id = uuidv4();
  const type = location.pathname.includes("task") ? "task" : "goal";
  let obj = {
    id: id,
    name: "",
    fakeParentId: fakeParentId,
    description: "",
    isPrivate: defaultObjectiveVisibilityOption.includes("private"),
    isCompanyGoal: false,
    isProject: false,
    weight: 0,
    startDate: moment()
      .startOf(defaultPeriodOnCreate)
      .toISOString(),
    dueDate: moment()
      .endOf(defaultPeriodOnCreate)
      .toISOString(),
    involvements: [],
    tags: [],
    complexity: 1,
    type: type,
    measurement: { ...newMeasurement },
    isShowAdvanced: false
  };

  if (objectiveCategoryId) {
    obj.objectiveCategoryId = objectiveCategoryId;
  }

  if (fakeParentId === null) {
    obj.measurement.rollUp = defaultRollupForParentObjective
  }

  return obj;
}

function onFocusAddSibling(
  id,
  currentList,
  currentValue,
  level,
  fakeParentId,
  newParentMeasurement,
  newChildMeasurement,
  objectiveCategoryId,
  config
) {
  if (fakeParentId == null) {
    if (
      currentList[currentList.length - 1].name != "" ||
      currentList[currentList.length - 1].id == id
    ) {
      currentList.push(
        newGoal(fakeParentId, newParentMeasurement, objectiveCategoryId, config, level)
      );
    }
    onFocusAddChildren(
      id,
      currentList,
      level,
      newChildMeasurement,
      objectiveCategoryId,
      config
    );
  } else {
    currentList.map(list => {
      if (list.id == fakeParentId) {
        if (
          list.children[list.children.length - 1].id == id ||
          !list.children.some(child => child.name === "")
        ) {
          list.children.push(
            newGoal(fakeParentId, newChildMeasurement, objectiveCategoryId, config, level)
          );
        }
        onFocusAddChildren(
          id,
          list.children,
          level,
          newChildMeasurement,
          objectiveCategoryId,
          config
        );
      } else if (list.children) {
        onFocusAddSibling(
          id,
          list.children,
          currentValue,
          level,
          fakeParentId,
          newParentMeasurement,
          newChildMeasurement,
          objectiveCategoryId,
          config
        );
      }
    });
  }
  return currentList;
}

function onFocusAddChildren(
  id,
  currentList,
  level,
  newMeasurement,
  objectiveCategoryId,
  config
) {
  currentList.map(list => {
    if ((list.id == id) & (level < 3)) {
      if (!list.children) {
        list.children = [
          newSubGoal(list.id, newMeasurement, objectiveCategoryId, config)
        ];
      } else if (!list.children.some(child => child.name === "")) {
        list.children.push(
          newSubGoal(list.id, newMeasurement, objectiveCategoryId, config)
        );
      }
    }
  });
  return currentList;
}

function deleteById(id, currentList) {
  for (var i = 0; i < currentList.length; i++) {
    if (currentList[i].id === id) {
      if (currentList[i].children && currentList[i].children.length > 1) {
      } else {
        currentList.splice(i, 1);
      }
    } else if (currentList[i].children) {
      deleteById(id, currentList[i].children);
    }
  }
  return currentList;
}

function restructureObjective(li) {
  for (var i = 0; i < li.length; i++) {
    li[i].involvements.map(involvement => delete involvement.user);
    if (li[i].name === "") {
      li.splice(i, 1);
    } else if (li[i].children) {
      restructureObjective(li[i].children);
    }
  }
  return li;
}

// MUTATION
function useCreateObjective() {
  const [
    { lists, singleObjective, isSuccess, isError, errorMessage, errorCode, manager },
    immerSetState
  ] = useContext(CreateObjectiveContext);

  const { user, isBca, config } = useUser();
  const {
    objectiveWeightType,
    defaultMetricForObjective,
    defaultMetricForSubObjective: defaultChildMetric,
    defaultMetricForTask,
    defaultRollupForParentObjective,
  } = config;
  const history = useHistory();
  const params = useParams();

  const newUser = {
    role: "assignee",
    user: user,
    userId: user.id,
    visible: true
  };

  const newLeader = {
    role: "leader",
    user: user,
    userId: user.id
  };

  const { listMetrics, objectiveCategories } = useMetrics();

  const defaultObjectiveCategory = objectiveCategories.find(({ isDefault }) => isDefault === true) || objectiveCategories[0];
  let objectiveCategoryId =
    objectiveWeightType === "type" && config.useDefaultObjectiveCategory ? defaultObjectiveCategory?.id : null;

  const type = location.pathname.includes("task") ? "task" : "goal";
  let defaultParentMetric = type == "task" ? defaultMetricForTask : defaultMetricForObjective;
  let detailDefaultParentMetric = listMetrics.find(
    value => value.description.toLowerCase().replace(" ", "_").includes(defaultParentMetric)
  );
  let detailDefaultChildMetric = listMetrics.find(
    value => value.description.toLowerCase().replace(" ", "_").includes(defaultChildMetric)
  );

  const extractDefaultRollup = (value) => {
    let defaultRollUp;

    if (value == 'auto_sum') {
      defaultRollUp = 'auto';
    } else
      if (value == 'auto_average') {
        defaultRollUp = 'average';
      } else {
        defaultRollUp = value;
      }

    return defaultRollUp;
  }

  let newParentMeasurement = {
    startingValue: 0,
    targetValue: 100,
    rollUp: type == "task" ? "disabled" : extractDefaultRollup(detailDefaultParentMetric?.defaultRollUp) || defaultRollupForParentObjective,
    unitId: detailDefaultParentMetric?.id || listMetrics?.[0].id
  }
  let newChildMeasurement = {
    startingValue: 0,
    targetValue: 100,
    rollUp: extractDefaultRollup(detailDefaultChildMetric?.defaultRollUp) || "disabled",
    unitId: detailDefaultChildMetric?.id || listMetrics?.[0].id
  }

  function changeValue(id, newValue) {
    //SETTER
    let newList = onChangeAction(id, newValue, lists);
    immerSetState(draft => {
      draft.lists = [...newList];
      draft.singleObjective = { ...draft.singleObjective, ...newValue };
    });
  }

  async function addChild(id, level, fakeParentId, currentValue, objective) {
    let isTeam = location.pathname.includes("/team") && level === 0;

    if (objective.involvements.length === 0) {
      objective.involvements.push(isTeam ? newLeader : newUser);

      if (manager) {
        const newReviewer = {
          role: isTeam ? "reviewer" : "assigner",
          user: manager,
          userId: manager?.id,
          visible: true
        };
        objective.involvements.push(newReviewer)
      }
    }

    let newList = onFocusAddSibling(
      id,
      lists,
      currentValue,
      level,
      fakeParentId,
      newParentMeasurement,
      newChildMeasurement,
      objectiveCategoryId,
      config
    );
    immerSetState(draft => {
      draft.lists = [...newList];
      draft.singleObjective = objective;
    });
  }

  function deleteGoal(id, level) {
    document.getElementById("panel-container-create-goal").blur();
    let newList = deleteById(id, lists);
    let singleObjective = newGoal(null, newParentMeasurement, objectiveCategoryId, config, level);
    immerSetState(draft => {
      draft.lists = [...newList];
      draft.singleObjective = singleObjective;
    });
  }

  function handleChangeObjective(id, newObjective) {
    let newList = onChangeObjective(id, newObjective, lists);
    immerSetState(draft => {
      draft.lists = [...newList];
      draft.singleObjective = newObjective;
    });
  }

  function removeVisible(listData) {
    listData.map(list => {
      if (list.involvements) {
        list.involvements.map(data => delete data.visible)
      }

      if (list?.measurement?.unitId == 0) {
        delete list.measurement;
      }

      if (list?.children?.length > 0) {
        removeVisible(list.children)
      }
    })
  }
  async function saveGoal() {
    let newList = restructureObjective(JSON.parse(JSON.stringify(lists)));
    let listTeam = newList[0];
    let listPayload = newList;
    let isTeam = location.pathname.includes("/team");
    let teamId = params ? params.teamId : null;

    removeVisible(listPayload);

    if (teamId) {
      listPayload.map(list => (list.teamId = teamId));
    }

    if (isTeam) {
      listPayload = listTeam;
      listPayload.objectives = listPayload.children;
      delete listPayload.children;
      delete listPayload.fakeParentId;
      delete listPayload.id;

      for (let i = 0; i < listPayload.involvements.length; i++) {
        if (listPayload.involvements[i].role === "leader") {
          listPayload.involvements.splice(i, 1);
        }
      }

      for (let a = 0; a < listPayload.objectives.length; a++) {
        for (let j = 0; j < listPayload.objectives[a].involvements.length; j++) {
          if (listPayload.objectives[a].involvements[j].role === "assignee") listPayload.objectives[a].involvements.splice(j, 1);
        }
      }
    }

    let saveObjective = isTeam ? createTeam : createMultipleObjective;

    const { isSuccess, error, data } = await saveObjective(listPayload)

    if (isSuccess) {
      const {
        assigneesArr,
        listAssigneeUserId,
        reviewerId,
        followersArr,
        followersUserId
      } = createObjectiveHelper(listPayload, isTeam);

      if (data.length > 1) AmplitudeUtils.createMultipleObjectives({ status: "success", "total objectives": data.length })
      if (data.length == 1) AmplitudeUtils.createObjective({
        status: "success",
        source: "direct",
        weight: data[0].weight || "",
        complexity: data[0].complexity || "",
        "auto sums": data[0].measurement?.rollUp || "",
        "goal-parent": data[0].parent || "",
        "total assignees": assigneesArr.length,
        "assignees id": listAssigneeUserId || "",
        "reviewer id": reviewerId || "",
        metric: data[0].measurement?.description || "",
        labels: data[0].tags || "",
        "total followers": followersArr.length,
        "followers id": followersUserId || "",
        recurring: data[0].recurrence?.type || "Never",
        grouped: false,
        type: data[0].type || "",
        "start date": data[0].startDate || "",
        "due date": data[0].dueDateDate || ""
      })
      immerSetState(draft => {
        draft.isSuccess = true;
      });
    } else {
      immerSetState(draft => {
        draft.isError = true;
        (draft.errorMessage = error.message), (draft.errorCode = error.code);
      });
    }
  }

  const createObjectiveHelper = (listPayload, isTeam) => {
    let assigneesArr, listAssigneeUserId, reviewerId, followersArr, followersUserId

    if (!isTeam) {
      const assignees = listPayload[0].involvements.filter(
        v => v.role === "assignee"
      );
      if (assignees) {
        assigneesArr = assignees.map(v => v.userId);
        listAssigneeUserId = assigneesArr.join(",");
      }

      const followers = listPayload[0].involvements.filter(
        v => v.role === "follower"
      );
      followersArr = followers.map(v => v.userId);
      followersUserId = followersArr.join(",")

      reviewerId = listPayload[0].involvements.filter(
        v => v.role === "assigner"
      )[0]?.userId
    }

    return {
      assigneesArr,
      listAssigneeUserId,
      reviewerId,
      followersArr,
      followersUserId
    }
  }


  function setIsSuccess(isSuccess) {
    immerSetState(draft => {
      draft.isSuccess = isSuccess;
    });
  }

  function setIsError(isError) {
    immerSetState(draft => {
      draft.isError = isError;
    });
  }

  return {
    lists,
    changeValue,
    addChild,
    deleteGoal,
    singleObjective,
    handleChangeObjective,
    saveGoal,
    isSuccess,
    isError,
    setIsSuccess,
    setIsError,
    errorMessage,
    errorCode
  };
}

function CreateObjectiveProvider(props) {
  const { user, config, manager } = useUser();
  const {
    objectiveWeightType,
    defaultObjectiveVisibilityOption,
    defaultPeriodOnCreate,
    defaultRollupForParentObjective,
    defaultMetricForObjective,
    defaultMetricForSubObjective,
    defaultMetricForTask
  } = config;
  let isTeam = location.pathname.includes("/team");
  const newUser = {
    role: isTeam ? "leader" : "assignee",
    user: user,
    userId: user.id,
    visible: true
  };
  const newInvolvements = [newUser]
  if (manager) {
    const newReviewer = {
      role: isTeam ? "reviewer" : "assigner",
      user: manager,
      userId: manager?.id,
      visible: true
    };
    newInvolvements.push(newReviewer)
  }
  const type = location.pathname.includes("task") ? "task" : "goal";
  const { listMetrics, objectiveCategories } = useMetrics();

  const defaultObjectiveCategory = objectiveCategories.find(({ isDefault }) => isDefault === true) || objectiveCategories[0];
  let objectiveCategoryId =
    objectiveWeightType === "type" && config.useDefaultObjectiveCategory ? defaultObjectiveCategory?.id : null;
  let defaultParentMetric = type === "goal" ? defaultMetricForObjective : defaultMetricForTask;
  let detailDefaultParentMetric = listMetrics.find(
    value => value.description.toLowerCase().replace(" ", "_").includes(defaultParentMetric)
  );
  let detailDefaultChildMetric = listMetrics.find(
    value => value.description.toLowerCase().replace(" ", "_").includes(defaultMetricForSubObjective)
  );

  const extractDefaultRollup = (value) => {
    let defaultRollUp;

    if (value == 'auto_sum') {
      defaultRollUp = 'auto';
    } else
      if (value == 'auto_average') {
        defaultRollUp = 'average';
      } else {
        defaultRollUp = value;
      }

    return defaultRollUp;
  }

  let newParentMeasurement = {
    startingValue: 0,
    targetValue: 100,
    rollUp: type == "task" ? "disabled" : extractDefaultRollup(detailDefaultParentMetric?.defaultRollUp) || defaultRollupForParentObjective,
    unitId: detailDefaultParentMetric?.id || listMetrics?.[0]?.id
  };
  let newChildMeasurement = {
    startingValue: 0,
    targetValue: 100,
    rollUp: extractDefaultRollup(detailDefaultChildMetric?.defaultRollUp) || "disabled",
    unitId: detailDefaultChildMetric?.id || listMetrics?.[0]?.id
  };

  const history = useHistory();
  const prevPath = history?.location?.state?.prevPath;
  let singleObjectiveId = "1-1";
  let singleObjective = {
    id: singleObjectiveId,
    name: "",
    description: "",
    fakeParentId: null,
    isPrivate: defaultObjectiveVisibilityOption.includes("private"),
    isCompanyGoal: user.isCompanyGoalCreator && prevPath === "/objectives/company",
    isProject: prevPath === "/projects",
    weight: 0,
    startDate: moment()
      .startOf(defaultPeriodOnCreate)
      .toISOString(),
    dueDate: moment()
      .endOf(defaultPeriodOnCreate)
      .toISOString(),
    involvements: newInvolvements,
    tags: [],
    complexity: 1,
    type: type,
    measurement: newParentMeasurement,
    children: [],
    isShowAdvanced: false
  };

  let singleObjectiveChildren = JSON.parse(JSON.stringify(singleObjective));
  singleObjective.measurement.rollUp = defaultRollupForParentObjective

  singleObjectiveChildren.isProject = false;
  singleObjectiveChildren.id = uuidv4();
  singleObjectiveChildren.fakeParentId = singleObjectiveId;
  singleObjectiveChildren.involvements = [];
  if (newChildMeasurement.unitId !== 0) {
    singleObjectiveChildren.measurement = newChildMeasurement;
  }

  let singleObjectiveSecond = JSON.parse(JSON.stringify(singleObjective));
  singleObjectiveSecond.id = uuidv4();
  singleObjectiveSecond.involvements = [];

  singleObjective.children.push(singleObjectiveChildren);

  if (objectiveCategoryId) {
    singleObjective.objectiveCategoryId = objectiveCategoryId;
    singleObjectiveSecond.objectiveCategoryId = objectiveCategoryId;
    singleObjectiveChildren.objectiveCategoryId = objectiveCategoryId;
  }

  if (isTeam) {
    let children = singleObjective.children;
    singleObjective = {
      id: singleObjectiveId,
      name: "",
      fakeParentId: null,
      involvements: newInvolvements,
      children,
      visibility: "public_team"
    };

    singleObjectiveSecond = JSON.parse(JSON.stringify(singleObjective));
    singleObjectiveSecond.id = uuidv4();

  }

  const LIST = [singleObjective, singleObjectiveSecond];

  let initialValue = {
    lists: LIST,
    singleObjective,
    isSuccess: false,
    isError: false,
    errorMessage: [],
    errorCode: "",
    manager: manager,
  };

  const [state, setState] = React.useState(initialValue);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <CreateObjectiveContext.Provider value={contextValue} {...props} />;
}

export { useCreateObjective, CreateObjectiveProvider };
