import React from "react";
import produce from "immer";
import moment from "moment";
import AmplitudeUtils from "src/library/utils/AmplitudeUtils";
import { useUser } from "context/UserContext"

//CREATE CONTEXT
const HeaderFilterContext = React.createContext();

const filter = {
  today: "day",
  annual: "year",
  quarter: "quarter",
  custom: "day",
  all_time: null
}

//PROVIDER
function HeaderFilterProvider(props) {
  const { config } = useUser();

  //INITIAL STATE
  const initialState = {
    headerFilter: {
      periodBegin: moment()
        .startOf(filter?.[config?.timeFilterOptions?.[0]])
        .toISOString(),
      periodEndBefore: moment()
        .endOf(filter?.[config?.timeFilterOptions?.[0]])
        .toISOString()
    },
    indexFilter: 0
  };

  if (location.pathname === "/objectives/need-response") {
    if (config.timeFilterOptions.includes("annual")) {
      initialState.headerFilter.periodBegin = moment().startOf("year").toISOString();
      initialState.headerFilter.periodEndBefore = moment().endOf("year").toISOString();
    }
  }

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <HeaderFilterContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useHeaderFilter() {
  const context = React.useContext(HeaderFilterContext);
  if (context === undefined) {
    throw new Error(
      `useHeaderFilter must be used within a HeaderFilterProvider`
    );
  }

  const [{ headerFilter, indexFilter }, immerSetState] = context;
  const setHeaderFilter = (data, name) => {
    AmplitudeUtils.filterTaskGoal({
      period: name
    });
    immerSetState(draft => {
      draft.headerFilter = { ...draft.headerFilter, ...data };
    });
  };

  const setIndexFilter = index => {
    immerSetState(draft => {
      draft.indexFilter = index;
    });
  };

  return {
    headerFilter,
    setHeaderFilter,
    indexFilter,
    setIndexFilter
  };
}

export { HeaderFilterProvider, useHeaderFilter };
