import React from "react";
import produce from "main/hooks/node_modules/immer";
import { getValueSummary } from "client/UserProfile";
import { useProfileFilter } from "./ProfileFilterContext";

//CREATE CONTEXT
const ProfileValueContext = React.createContext();

//PROVIDER
function ProfileValueProvider(props) {
  //INITIAL STATE
  const initialState = {
    values: null
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <ProfileValueContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useProfileValue() {
  const [{ values }, immerSetState] = React.useContext(ProfileValueContext);
  const { filter } = useProfileFilter();

  const getValuesData = async userId => {
    const query = {
      ...filter
    };
    const { data, error } = await getValueSummary(query, userId);

    if (data) {
      immerSetState(draft => {
        draft.values = data;
      });
    }
  };

  return {
    values,
    getValuesData
  };
}

export { ProfileValueProvider, useProfileValue };
