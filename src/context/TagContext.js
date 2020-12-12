import React from "react";
import produce from "main/hooks/node_modules/immer";
import { getTags } from "main/hooks/node_modules/client/TagClient";

//CREATE CONTEXT
const TagContext = React.createContext();

//PROVIDER
function TagProvider(props) {
  //INITIAL STATE
  const initialState = {
    predefined: [],
    others: []
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <TagContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useTag() {
  const [{ predefined, others }, immerSetState] = React.useContext(TagContext);

  const getTagsData = async query => {
    const _query = {
      limit: 20,
      ...query
    };

    const { data } = await getTags(_query);

    if (data) {
      immerSetState(draft => {
        draft.predefined = data.predefined;
        draft.others = data.others;
      });
    }
  };

  return {
    predefined,
    others,
    getTagsData
  };
}

export { TagProvider, useTag };
