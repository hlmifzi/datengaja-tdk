import React from "react";
import produce from "main/hooks/node_modules/immer";
import { getObjectiveUserSugestion } from "main/hooks/node_modules/client/SuggestionClient";

//CREATE CONTEXT
const UserSuggestionContext = React.createContext();

//PROVIDER
function UserSuggestionProvider(props) {
  //INITIAL STATE
  const initialState = {
    suggestion: [],
    hasMore: true,
    olderThan: "",
    newerThan: ""
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <UserSuggestionContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useUserSuggestion() {
  const [{ suggestion, olderThan, hasMore }, immerSetState] = React.useContext(
    UserSuggestionContext
  );

  const getSuggestionData = async query => {
    const _query = {
      limit: 20,
      ...query
    };

    const { data, pagination } = await getObjectiveUserSugestion(_query);
    if (data) {
      immerSetState(draft => {
        draft.suggestion = data;
        draft.olderThan = pagination?.next?.olderThan;
        draft.hasMore = pagination?.prev?.newerThan == null ? false : true;
      });
    }
    return { data, pagination }
  };

  const appendSuggestionData = async query => {
    const _query = {
      limit: 20,
      olderThan: olderThan,
      ...query
    };

    const { data, pagination } = await getObjectiveUserSugestion(_query);
    if (data) {
      immerSetState(draft => {
        draft.suggestion.push.apply(draft.suggestion, data);
        draft.hasMore = pagination?.prev?.newerThan == null ? false : true;
        draft.olderThan = pagination?.next?.olderThan;
        draft.newerThan = pagination?.next?.newerThan;
      });
    }
  };

  return {
    suggestion,
    hasMore,
    getSuggestionData,
    appendSuggestionData
  };
}

export { UserSuggestionProvider, useUserSuggestion };
