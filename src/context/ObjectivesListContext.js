import React from "react";
import produce from "main/hooks/node_modules/immer";
import {
  getListObjectives,
  getMySingleObjectiveTree,
  getSingleObjectiveTree,
  getListNeedResponse,
  getObjectiveBasedId
} from "main/hooks/node_modules/client/ObjectivesClient";
import { useUser } from "./UserContext";
import { objectiveRestructuring } from "src/library/utils/ObjectiveRestructuring";
//CREATE CONTEXT
const ObjectivesListContext = React.createContext();

//PROVIDER
function ObjectivesListContextProvider(props) {
  //INITIAL STATE
  const initialState = {
    objectives: [],
    singleObjectiveDetail: {},
    showReviewModal: false,
    objectiveMode: "list",
    olderThan: ""
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <ObjectivesListContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useObjectivesList() {
  const [
    {
      objectives,
      objectiveMode,
      singleObjectiveDetail,
      olderThan,
      showReviewModal
    },
    immerSetState
  ] = React.useContext(ObjectivesListContext);

  const { user } = useUser();
  const hasMore = olderThan ? true : false;

  const getObjectiveBasedIdContext = async objectiveId => {
    const { data } = await getObjectiveBasedId(objectiveId);
    immerSetState(draft => {
      draft.objectives = data;
    });
  };

  const getObjectivesContext = async params => {
    const _params = {
      limit: 15,
      ...params
    };

    const { data, pagination } = await getListObjectives(_params);

    let newData = [...objectives];
    let newObjectiveMode = objectiveMode;
    if (_params.olderThan) {
      newData.push.apply(newData, data);
    } else {
      newData = data;
      newObjectiveMode = "list";
    }

    immerSetState(draft => {
      draft.objectives = newData;
      draft.latestParams = params;
      draft.olderThan = pagination.next.olderThan;
      draft.objectiveMode = newObjectiveMode;
    });
  };

  const getNeedResponseContext = async params => {
    let _params = {
      parentNotAssignedTo: user.id,
      markStars: user.id,
      ...params
    };
    const { data } = await getListNeedResponse(_params);
    immerSetState(draft => {
      draft.objectives = data;
    });
  };

  const getGoalTreeContext = async objectiveParentId => {
    const { data } = await getSingleObjectiveTree(objectiveParentId);
    immerSetState(draft => {
      draft.ready = true;
      draft.objectives = [data];
    });
  };

  const setSingleObjectiveDetailContext = (objective, newObjectiveMode) => {
    immerSetState(draft => {
      draft.singleObjectiveDetail = objective;
      draft.objectiveMode = newObjectiveMode ? newObjectiveMode : "detail";
    });
  };

  const setObjectiveMode = objectiveMode => {
    immerSetState(draft => {
      draft.objectiveMode = objectiveMode;
    });
  };

  const reloadParentObjectiveContext = async (
    objectiveParentId,
    isNotMyGoal
  ) => {
    let reloadObjective = isNotMyGoal
      ? getSingleObjectiveTree
      : getMySingleObjectiveTree;
    const { data } = await reloadObjective(objectiveParentId);
    const objectiveIdThatShouldReload = objectives.findIndex(
      objective => objective.id === objectiveParentId
    );
    immerSetState(draft => {
      draft.objectives[objectiveIdThatShouldReload] = data;
    });
  };

  const deleteObjectiveBasedIdContext = objectiveId => {
    let newObjectives = [...objectives];
    newObjectives = newObjectives.filter(
      objective => objective.id !== objectiveId
    );
    immerSetState(draft => {
      draft.objectives = newObjectives;
    });
  };

  const showReviewModalPopup = () => {
    immerSetState(draft => {
      draft.showReviewModal = true;
    });
  };

  const hideReviewModalPopup = () => {
    immerSetState(draft => {
      draft.showReviewModal = false;
    });
  };

  return {
    objectives,
    objectiveMode,
    setObjectiveMode,
    singleObjectiveDetail,
    getObjectivesContext,
    setSingleObjectiveDetailContext,
    reloadParentObjectiveContext,
    getGoalTreeContext,
    getObjectiveBasedIdContext,
    deleteObjectiveBasedIdContext,
    getNeedResponseContext,
    hasMore,
    olderThan,
    showReviewModal,
    showReviewModalPopup,
    hideReviewModalPopup
  };
}

export { ObjectivesListContextProvider, useObjectivesList };
