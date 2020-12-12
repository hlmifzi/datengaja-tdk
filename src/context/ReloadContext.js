import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

//CREATE CONTEXT
const ReloadContext = React.createContext();

//PROVIDER
function ReloadProvider(props) {
  const initialState = {
    reloadObjectives: false,
    reloadApprovalPanel: [],
    reloadUser: false,
    reloadObjectiveId: {id: 0},
    reloadType: "",
    reloadOveralStatus: false,
    reloadOverallProgress: false,
    reloadSidebar: false,
    reloadActivityNotifCount: false,
    reloadNeedResponseNotifCount: false,
    reloadApprovalNotifCount: false,
    reloadFeeds: false,
    reloadGroups: false,
    reloadGroupFeeds: {},
    reloadCommentCountPost: {postId: 0},
    reloadLikeCountPost: {postId: 0, action: ""},
    reloadScrollTimeline: false,
    reloadFeedsId: {id: 0},
    reloadAdminCycles: false,
  }

  const [state, setState] = useState(initialState);
  const contextValue = [state, setState];

  return <ReloadContext.Provider value={contextValue} {...props} />;
}

//MUTATION / GETTER
function useReload() {
  const [state, setState] = React.useContext(ReloadContext);

  const reload = (data) => {
    setState(draft => ({...draft, ...data}));
  };

  return {
    reload,
    reloadObjectives: state.reloadObjectives,
    reloadApprovalPanel: state.reloadApprovalPanel,
    reloadUser: state.reloadUser,
    reloadObjectiveId: state.reloadObjectiveId,
    reloadType: state.reloadType,
    reloadOveralStatus: state.reloadOveralStatus,
    reloadOverallProgress: state.reloadOverallProgress,
    reloadSidebar: state.reloadSidebar,
    reloadActivityNotifCount: state.reloadActivityNotifCount,
    reloadNeedResponseNotifCount: state.reloadNeedResponseNotifCount,
    reloadApprovalNotifCount: state.reloadApprovalNotifCount,
    reloadFeeds: state.reloadFeeds,
    reloadGroupFeeds: state.reloadGroupFeeds,
    reloadCommentCountPost: state.reloadCommentCountPost,
    reloadLikeCountPost: state.reloadLikeCountPost,
    reloadScrollTimeline: state.reloadScrollTimeline,
    reloadFeedsId: state.reloadFeedsId,
    reloadGroups: state.reloadGroups,
    reloadAdminCycles: state.reloadAdminCycles,
  };
}

export { ReloadProvider, ReloadContext, useReload };
