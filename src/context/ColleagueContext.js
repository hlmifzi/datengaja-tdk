import React from "react";
import produce from "main/hooks/node_modules/immer";
import { getColleague } from "client/ColleagueClient";

//CREATE CONTEXT
const ColleagueContext = React.createContext();

//PROVIDER
function ColleagueProvider(props) {
  //INITIAL STATE
  const initialState = {
    colleague: [],
    hasMore: true,
    olderThan: "",
    newerThan: ""
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <ColleagueContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useColleague() {
  const [{ colleague, olderThan, hasMore }, immerSetState] = React.useContext(
    ColleagueContext
  );

  const getColleagueData = async query => {
    const _query = {
      limit: 20,
      ...query
    };

    const { data, pagination } = await getColleague(_query);

    if (data) {
      immerSetState(draft => {
        draft.colleague = data;
        draft.olderThan = pagination.next.olderThan || "";
        draft.hasMore = pagination.prev.newerThan == null ? false : true;
      });
    }
  };

  const appendColleagueData = async query => {
    const _query = {
      limit: 20,
      olderThan: olderThan,
      ...query
    };

    const { data, pagination } = await getColleague(_query);

    if (data) {
      immerSetState(draft => {
        draft.colleague.push.apply(draft.colleague, data);
        draft.hasMore = pagination.prev.newerThan == null ? false : true;
        draft.olderThan = pagination.next.olderThan;
        draft.newerThan = pagination.next.newerThan;
      });
    }
  };

  return {
    colleague,
    hasMore,
    getColleagueData,
    appendColleagueData
  };
}

export { ColleagueProvider, useColleague };
