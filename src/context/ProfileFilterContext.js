import React from "react";
import produce from "immer";
import Moment from "moment";
import { useUser } from "context/UserContext";
//CREATE CONTEXT
const ProfileFilterContext = React.createContext();
//PROVIDER
function ProfileFilterProvider(props) {
  const { isBca } = useUser();
  //INITIAL STATE
  let initialState = {
    filter: {
      periodBegin: Moment()
        .startOf("day")
        .toISOString(),
      periodEndBefore: Moment()
        .endOf("day")
        .toISOString()
    },
    year: new Date().getFullYear()
  };

  let bcaFilter = {
    filter: {
      periodBegin: Moment()
        .startOf("year")
        .toISOString(),
      periodEndBefore: Moment()
        .endOf("year")
        .toISOString()
    },
    year: new Date().getFullYear()
  }

  initialState = isBca ? bcaFilter : initialState;

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <ProfileFilterContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useProfileFilter() {
  const [{ filter, year }, immerSetState] = React.useContext(
    ProfileFilterContext
  );

  const setFilter = data => {
    immerSetState(draft => {
      draft.filter = data;
    });
  };

  const setYear = data => {
    immerSetState(draft => {
      draft.year = data;
    });
  };

  return {
    year,
    filter,
    setFilter,
    setYear
  };
}

export { ProfileFilterProvider, useProfileFilter };
