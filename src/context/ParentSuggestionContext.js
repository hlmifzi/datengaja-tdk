import React from "react";
import produce from "main/hooks/node_modules/immer";
import { getParentSuggestions } from "main/hooks/node_modules/client/ObjectivesClient";

// CREATE CONTEXT
const ParentSuggestionContext = React.createContext();

// PROVIDER
const ParentSuggestionProvider = props => {
  // INITIAL STATE
  const initialState = {
    listValue: [],
    hasMore: true,
    olderThan: "",
    newerThan: ""
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <ParentSuggestionContext.Provider value={contextValue} {...props} />;
};

const useParentSuggestion = () => {
  const [{ listValue, hasMore, olderThan }, immerSetState] = React.useContext(
    ParentSuggestionContext
  );

  const getParentSuggestionData = async query => {
    const _query = {
      limit: 20,
      ...query
    };

    const { data, pagination } = await getParentSuggestions(_query);
    if (data) {
      immerSetState(draft => {
        draft.listValue = data;
        draft.olderThan = pagination?.next?.olderThan;
        draft.hasMore = pagination?.prev?.newerThan == null ? false : true;
      });
    }
  };

  const appendParentSuggestionData = async query => {
    const _query = {
      limit: 20,
      olderThan: olderThan,
      ...query
    };

    const { data, pagination } = await getParentSuggestions(_query);
    if (data) {
      immerSetState(draft => {
        draft.listValue.push.apply(draft.listValue, data);
        draft.olderThan = pagination?.next?.olderThan;
        draft.newerThan = pagination?.next?.newerThan;
        draft.hasMore = pagination?.prev?.newerThan == null ? false : true;
      });
    }
  };

  return {
    listValue,
    hasMore,
    getParentSuggestionData,
    appendParentSuggestionData
  };
};

export { ParentSuggestionProvider, useParentSuggestion };
