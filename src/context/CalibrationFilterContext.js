import React from "react";
import produce from "main/hooks/node_modules/immer";
//CREATE CONTEXT
const CalibrationFilterContext = React.createContext();

//PROVIDER
function CalibrationFilterProvider(props) {
    //INITIAL STATE
    const initialState = {
        listFilter: [],
        selectedFilter: []
    };

    const [state, setState] = React.useState(initialState);

    const immerSetState = newState =>
        setState(currentState => produce(currentState, newState));
    const contextValue = [state, immerSetState];

    return <CalibrationFilterContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useCalibrationFilter() {
    const context = React.useContext(CalibrationFilterContext);
    if (context === undefined) {
        throw new Error(
            `useCalibrationFilter must be used within a CalibrationFilterProvider`
        );
    }

    const [{ listFilter, selectedFilter }, immerSetState] = context;

    const setListFilter = data => {
        immerSetState(draft => {
            draft.listFilter = data;
        });
    };

    const setSelectedFilter = data => {
        immerSetState(draft => {
            draft.selectedFilter = data;
        });
    };

    return {
        listFilter,
        selectedFilter,
        setSelectedFilter,
        setListFilter
    };
}

export { CalibrationFilterProvider, useCalibrationFilter };
