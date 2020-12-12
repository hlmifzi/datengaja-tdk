import React from "react";
import produce from "main/hooks/node_modules/immer";
// UI Auth Context
const AuthPageContext = React.createContext();

// Provider for UI Auth Page
function AuthPageProvider(props) {
  const initialState = {
    organization: "",
    email: "",
    password: "",
    confirmPassword: "",
    resetPasswordAllowed: true
  };

  const [state, setState] = React.useState(initialState);
  const immerState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerState];

  return <AuthPageContext.Provider value={contextValue} {...props} />;
}

// MUTATION for UI Auth Page
function UseAuthPage() {
  const [
    { organization, email, password, confirmPassword, resetPasswordAllowed },
    immerSetState
  ] = React.useContext(AuthPageContext);

  // General Function
  const handleOnChange = (name, value) => {
    immerSetState(draft => {
      draft[name] = value;
    });
  };

  const resetInputState = () => {
    immerSetState(draft => {
      (draft.email = ""),
        (draft.password = ""),
        (draft.confirmPassword = ""),
        (draft.organization = ""),
        (draft.resetPasswordAllowed = true);
    });
  };

  return {
    organization,
    email,
    password,
    confirmPassword,
    resetPasswordAllowed,
    handleOnChange,
    resetInputState
  };
}

export { AuthPageProvider, UseAuthPage };
