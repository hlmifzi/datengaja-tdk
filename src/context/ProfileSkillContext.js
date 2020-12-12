import React from "react";
import produce from "main/hooks/node_modules/immer";
import { getRecognition, getSkills } from "client/UserProfile";
import { useProfileFilter } from "./ProfileFilterContext";

//CREATE CONTEXT
const ProfileSkillContext = React.createContext();

//PROVIDER
function ProfileSkillProvider(props) {
  //INITIAL STATE
  const initialState = {
    strengths: [],
    weaknesses: []
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <ProfileSkillContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useProfileSkill() {
  const { filter } = useProfileFilter();
  const [{ strengths, weaknesses }, immerSetState] = React.useContext(
    ProfileSkillContext
  );

  const getStrengthData = async userId => {
    const query = {
      ...filter
    };
    const { data, error } = await getRecognition(query, userId);

    if (data) {
      immerSetState(draft => {
        draft.strengths = data;
      });
    }
  };

  const getWeaknessData = async userId => {
    const query = {
      ...filter,
      type: "weakness"
    };

    const { data, error } = await getSkills(query, userId);

    if (data) {
      immerSetState(draft => {
        draft.weaknesses = data;
      });
    }
  };

  return {
    strengths,
    weaknesses,
    getStrengthData,
    getWeaknessData
  };
}

export { ProfileSkillProvider, useProfileSkill };
