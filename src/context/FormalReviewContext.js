import React, { useState, useEffect } from "react";
import produce from "immer";
import {
  getFormalReviewAssignment,
  getFormalReviewGoalsScoring,
  setAnswerFormalReviewScoring,
  setAnswerAnnualReviewScoring,
  setFormalReviewAnswer
} from "client/FormalReviewClient";
import { useUser } from "context/UserContext";
import useDebounce from 'hooks/useDebounce.js';

//CREATE CONTEXT
const FormalReviewContext = React.createContext([{}, function () { }]);

//PROVIDER
function FormalReviewProvider(props) {
  //INITIAL STATE
  const initialState = {
    assignmentId: "",
    status: "",
    cycle: {},
    involvedUser: {
      actor: {},
      target: {}
    },
    phase: {},
    currentTrack: "",
    tracks: [],
    assignmentState: "",
    ready: false,
    lastUpdate: "",
    objectId: 0,
    title: "",
    activeEvidence: "FormalReview",
    activeTypeTab: "strength",
    overlayRightSidebarData: {},

    // goals scoring
    listScoring: {},

    error: {}
  };

  const [state, setState] = React.useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <FormalReviewContext.Provider value={contextValue} {...props} />;
}

//MUTATION
function useFormalReview() {
  const [newAnswer, setNewAnswer] = useState(null)
  const debouncedAnswer = useDebounce(newAnswer, 500)

  const [state, immerSetState] = React.useContext(FormalReviewContext);
  const { organization } = useUser();

  const getSingleFormalReview = async assignmentId => {
    const { data, error } = await getFormalReviewAssignment(assignmentId);
      const { tracks } = data || {};

      ["goals_scoring", "tasks_scoring", "competencies_scoring", "values_scoring"].forEach((trackType) => {
        prefillAnswers(data, tracks, trackType)
      })

    immerSetState(draft => {
      draft.assignmentId = data?.id
      draft.cycle = data?.formalReviewCycle
      draft.involvedUser = { actor: data?.actor, target: data?.target }
      draft.phase = data?.formalReviewPhase
      draft.currentTrack = state.currentTrack == "" ? data?.currentTrack : state.currentTrack
      draft.tracks = data?.tracks || []
      draft.assignmentState = data?.state
      draft.ready = true
      draft.error = error
    });
  };

  const prefillAnswers = (data, tracks, trackType) => {
    let index = tracks?.findIndex(
      track => track.trackType === trackType
    );

    // If there is no 'answers' AND there is Prefill -> answers = Prefill + setAnswer (Hit API)
    if (
      tracks?.[index] &&
      tracks?.[index]?.answers?.length === 0 &&
      tracks?.[index]?.preFill?.length > 0
    ) {
      data.tracks[index].answers = data.tracks?.[index]?.preFill;
      let answerParams = {
        answers: tracks?.[index]?.preFill
      }

      if(trackType == "values_scoring" || trackType == "competencies_scoring"){
        answerParams["average"] = 0 // Set to 0 deliberately, Back-End re-calculate the average answer value
      }

      setAnswerContext(trackType, answerParams);
    }
  }

  const getSingleGoalsScoring = async assignmentId => {
    const { data } = await getFormalReviewGoalsScoring(assignmentId);
    immerSetState(draft => {
      draft.listScoring = data;
    });
  };

  const getSingleTrack = trackType => {
    const { tracks } = state;
    for (let i = 0; i < tracks?.length; i++) {
      if (tracks[i].trackType === trackType) {
        return tracks[i];
      }
    }
  };

  const changeTrack = trackType => {
    immerSetState(draft => {
      draft.currentTrack = trackType;
      draft.objectId = 0;
      draft.activeEvidence = "FormalReview";
      draft.activeTypeTab = "strength";
    });
  };

  const setAnswerContext = async (trackType, answers, answerType) => {
    setNewAnswer({trackType,answers,answerType})
  };

  const updateAnswerContext = async (trackType, answers, answerType) => {
    immerSetState(draft => {
      draft.status = "Saving...";
    });

    const { assignmentId } = state;

    const singleTrack = getSingleTrack(trackType);
    const trackId = singleTrack.id;

    const { data } = await setFormalReviewAnswer(
      assignmentId,
      trackId,
      trackType,
      answers,
      answerType && answerType
    );

    immerSetState(draft => {
      (draft.lastUpdate = data ? data.lastUpdate : Date.now()),
        (draft.status = "Saved");
    });
  }

  const setAnswerAnnualReviewContext = async (trackType, answers) => {
    immerSetState(draft => {
      draft.status = "Saving...";
    });

    const { assignmentId } = state;
    const { data } = await setAnswerAnnualReviewScoring(
      assignmentId,
      trackType,
      answers
    );
    immerSetState(draft => {
      (draft.lastUpdate = data ? data.lastUpdate : Date.now()),
        (draft.status = "Saved");
    });
  };

  const setBehaviourEvidence = (objectId, title) => {
    immerSetState(draft => {
      draft.objectId = objectId;
      draft.title = title;
      draft.activeEvidence = "FormalReview";
      draft.activeTypeTab = "strength";
    });
  };

  const setActiveEvidence = (name) => {
    immerSetState(draft => {
      draft.activeEvidence = name
    })
  }

  const setActiveTypeTab = (type) => {
    immerSetState(draft => {
      draft.activeTypeTab = type
    })
  }

  const setOverlayRightSidebarData = ({ name, description, data, loading }) => {
    immerSetState(draft => {
      draft.overlayRightSidebarData.name = name;
      draft.overlayRightSidebarData.description = description;
      draft.overlayRightSidebarData.data = data
      draft.overlayRightSidebarData.loading = loading
    })
  }

  useEffect(() => {
    if(newAnswer){
      const {trackType, answers, answerType} = newAnswer
      updateAnswerContext(trackType, answers, answerType)
    }
  }, [debouncedAnswer])

  return [
    state,
    {
      getSingleFormalReview,
      getSingleGoalsScoring,
      getSingleTrack,
      changeTrack,
      setAnswerContext,
      setAnswerAnnualReviewContext,
      setBehaviourEvidence,
      setActiveEvidence,
      setActiveTypeTab,
      setOverlayRightSidebarData
    }
  ];
}

export { FormalReviewProvider, useFormalReview };