import React from "react";
import produce from "immer";
import isEqual from "lodash/isEqual";
import { useUser } from "context/UserContext";

//CREATE CONTEXT
const AdvanceFilterContext = React.createContext();
const defaultFilter = {
  q: null,
  state: ["running", "completed"],
  tags: [],
  assigneeId: [],
  assignerId: [],
  periodBegin: null,
  periodEndBefore: null,
  sortColumn: "name",
  sortDirection: "asc",
  type: null
};
const groupBy = "no-group";

//PROVIDER
function AdvanceFilterProvider(props) {
  const { config } = useUser();
  const permission = config.permissions;
  const groupByList = [
    { id: "no-group", name: "No Group", visible: true },
    { id: "goal-type", name: "Goal Type", visible: true },
    { id: "top-parent", name: "Top Parent", visible: permission?.taskAlignmentEdit },
  ]

  //INITIAL STATE
  const initialState = {
    advanceFilter: defaultFilter,
    groupBy: groupBy,
    groupByList: groupByList,
  };
  
  const [state, setState] = React.useState(initialState);

  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <AdvanceFilterContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useAdvanceFilter() {
  const context = React.useContext(AdvanceFilterContext);
  if (context === undefined) {
    throw new Error(
      `useAdvanceFilter must be used within a AdvanceFilterProvider`
    );
  }

  const [{ advanceFilter, filtering, groupBy, groupByList }, immerSetState] = context;

  const setAdvanceFilter = data => {
    immerSetState(draft => {
      draft.advanceFilter = { ...advanceFilter, ...data };
    });
  };

  const setGroupBy = data => {
    immerSetState(draft => {
      draft.groupBy = data
    })
  }

  const setDefaultFilter = () => {
    immerSetState(draft => {
      draft.advanceFilter = defaultFilter;
    });
  };

  return {
    advanceFilter,
    setAdvanceFilter,
    setDefaultFilter,
    groupBy,
    setGroupBy,
    groupByList,
    filtering: !(isEqual(advanceFilter, defaultFilter))
  };
}

export { AdvanceFilterProvider, useAdvanceFilter };
