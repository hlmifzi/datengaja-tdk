import React from "react";
import produce from "main/hooks/node_modules/immer";
import {
  getListObjectives,
  getSingleObjectiveTree
} from "main/hooks/node_modules/client/ObjectivesClient";
import { useUser } from "./UserContext";
import { getSubordinate, getManager } from "client/UserProfile";
//CREATE CONTEXT
const RelatedUserGoalsContext = React.createContext();

//PROVIDER
function RelatedUserGoalsProvider(props) {
  //INITIAL STATE
  const initialState = {
    users: []
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <RelatedUserGoalsContext.Provider value={contextValue} {...props} />;
}

function useRelatedUserGoals() {
  const [
    { users, objectiveMode, singleObjectiveDetail, singleObjectiveAction },
    immerSetState
  ] = React.useContext(RelatedUserGoalsContext);
  const { user } = useUser();

  const getDirectReports = async () => {
    const { data } = await getSubordinate(user.id);
    if (data) {
      immerSetState(draft => {
        draft.users = data;
      });
    }
  };

  const getManagers = async () => {
    const { data } = await getManager(user.id);
    if (data) {
      immerSetState(draft => {
        draft.users = data;
      });
    }
  };

  const setObjectives = async (key, params) => {
    let _params = {
      assigneeId: users[key].user.id,
      reviewsVisibility: 1,
      state: ["running", "completed"],
      parentNotAssignedTo: users[key].user.id,
      ...params
    };

    const { data } = await getListObjectives(_params);
    let newUsers = [...users];
    newUsers[key]["objectives"] = data;

    immerSetState(draft => {
      draft.users = newUsers;
    });
  };

  const reloadParentObjective = async objectiveParentId => {
    const { data } = await getSingleObjectiveTree(objectiveParentId);
    const userId = data.involvements.find(
      involvement => involvement.role === "assignee"
    ).user.id;
    const userKey = users.findIndex(user => user.user.id === userId);
    const objectiveIdThatShouldReload = users[userKey].objectives.findIndex(
      objective => objective.id === objectiveParentId
    );
    immerSetState(draft => {
      draft.users[userKey]["objectives"][objectiveIdThatShouldReload] = data;
    });
  };

  const deleteObjectiveBasedIdContext = objectiveId => {
    const userId = data.involvements.find(
      involvement => involvement.role === "assignee"
    ).user.id;
    const userKey = users.findIndex(user => user.user.id === userId);
    let newUsers = [...users];
    newUsers = newUsers[userKey].objectives.filter(
      objective => objective.id !== objectiveId
    );
    immerSetState(draft => {
      draft.users = newUsers;
    });
  };

  return {
    users,
    objectiveMode,
    singleObjectiveAction,
    singleObjectiveDetail,
    getDirectReports,
    getManagers,
    setObjectives,
    reloadParentObjective,
    deleteObjectiveBasedIdContext
  };
}

export { RelatedUserGoalsProvider, useRelatedUserGoals };
