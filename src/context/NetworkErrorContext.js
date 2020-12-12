import React, { useReducer } from "react";
import { getObjectiveLocale } from "src/library/utils/HelperUtils";

//CREATE CONTEXT
const NetworkErrorContext = React.createContext();

//REDUCER
function NetworkErrorReducer(state, action) {
  const { type, error } = action
  switch (type) {
    case 'ENQUEUE': {
      return [...state, error]
    }
    case 'DEQUEUE': {
      return state.splice(1)
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

//PROVIDER
function NetworkErrorProvider(props) {
  const [queue, dispatch] = useReducer(NetworkErrorReducer, [])
  const queueHead = queue[0];
  const contextValue = [{ queue, queueHead }, dispatch]

  return <NetworkErrorContext.Provider value={contextValue} {...props} />;
}

//HOOKS
function useNetworkError() {
  const [{ queue, queueHead }, dispatch] = React.useContext(NetworkErrorContext);

  const pushError = (payload) => {
    let isSuccess = payload?.isSuccess || false
    let message = payload?.message
    if (!(message && typeof (message) === "string")) {
      message = getObjectiveLocale("There's an error please recheck again")
    }

    const error = { code: payload.code, message, isSuccess }
    dispatch({ type: "ENQUEUE", error })
  }

  const popError = () => {
    dispatch({ type: "DEQUEUE" })
  }

  const globalHandler = error => {
    let endpoint = error.config.url
    let err = error.response.data.error
      ? error.response.data.error
      : error.response.data.errors;

    switch (err.code) {
      case 401:
        localStorage.setItem("tokenInvalid", true);
        if (!endpoint.includes("auth") && !window.Cypress) {
          alert('You’ve been idle for a while. For security reason, please re-login to secure your account');
          location.replace("/login/email");
        }
        break;

      case 422:
        pushError(err);
        break;

      default:
        break;
    }

    return Promise.reject(error)
  }


  return {
    queue,
    queueHead,
    pushError,
    popError,
    globalHandler
  }
}

export { NetworkErrorProvider, NetworkErrorContext, useNetworkError };
