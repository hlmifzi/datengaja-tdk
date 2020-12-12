import React, { useState, useContext, useRef } from "react";
import produce from "immer";

import { useUser } from "context/UserContext";
import { loadMoreValidator } from "src/library/utils/HelperUtils";
import {
  getFeedsTimeline,
  getRecentFeelingPost,
  getRecognitionPost, getSavedPost,
  getFilterFeeds, getFeedsbyLabel
} from "client/CultureClient";

const CultureContext = React.createContext();

function useCulture() {
  const [
    { olderThan, onLoadMore, feeds, scrollPosition, isLoading, selectedType, currentTab, groupDetail, showToast },
    immerSetState
  ] = useContext(CultureContext);

  const { user } = useUser();

  let timelineRef = useRef();

  function setOlderThan(olderThan) {
    immerSetState(draft => {
      draft.olderThan = olderThan;
    });
  }

  function setOnLoadMore(onLoadMore) {
    immerSetState(draft => {
      draft.onLoadMore = onLoadMore;
    });
  }

  function setFeeds(feeds) {
    immerSetState(draft => {
      draft.feeds = feeds;
    });
  }

  function setScrollPosition(scrollPosition) {
    immerSetState(draft => {
      draft.scrollPosition = scrollPosition;
    });
  }

  function setIsLoading(isLoading) {
    immerSetState(draft => {
      draft.isLoading = isLoading;
    });
  }

  function setSelectedType(isLoading) {
    immerSetState(draft => {
      draft.isLoading = isLoading;
    });
  }

  function setCurrentTab(currentTab) {
    immerSetState(draft => {
      draft.currentTab = currentTab;
    });
  }

  function setGroupDetail(groupDetail) {
    immerSetState(draft => {
      draft.groupDetail = groupDetail;
    });
  }

  function setShowToast(showToast) {
    immerSetState(draft => {
      draft.showToast = showToast;
    });
  }

  const getFeeds = async (groupId, isChangeGroup, backToTimeline = false) => {
    let params = {
      limit: 10,
      lastId: isChangeGroup ? null : olderThan,
    }
    currentTab === "popular" ? params.popular = 1 : ""
    currentTab === "feeling" ? params.postType = currentTab : ""

    const { data, pagination } = await getFeedsTimeline(groupId || -1, params)
    if (data) {
      setOlderThan(pagination.next.olderThan)
      isChangeGroup ? setFeeds(data) : setFeeds([...feeds, ...data])
    }
    if (backToTimeline) {
      setIsLoading(false);
      timelineRef?.current?.scrollTo(0, scrollPosition);
    }
  }

  const getFeedsbyType = async (lastId) => {
    !lastId && setIsLoading(true)
    let typeFunction = () => { }
    let params = { lastId: lastId }

    switch (selectedType) {
      case "recent":
      case "feeling":
        if (selectedType === "feeling") params.postType = selectedType
        typeFunction = await getRecentFeelingPost(user.id, params)
        break;
      case "recognition":
        typeFunction = await getRecognitionPost(user.id, params)
        break;
      case "saved":
        typeFunction = await getSavedPost({ limit: 20 })
        break;
      case "recognition-filter":
      case "poll-filter":
      case "feeling-filter":
        const typeFilter = selectedType.split("-")[0]
        typeFunction = await getFilterFeeds(typeFilter, params)
        break;
      default:
        if (typeof selectedType === "number") {
          typeFunction = await getFeedsbyLabel(selectedType, params)
        }
    }

    const { data, pagination, isSuccess, error } = typeFunction
    if (isSuccess) {
      if (data) {
        lastId === 0 ? setFeeds(data) : setFeeds([...feeds, ...data])
        const older = pagination?.next?.olderThan === pagination?.prev?.newerThan ? null : pagination?.next?.olderThan
        setOlderThan(older)
      }
    } else {
      setFeeds([])
      setShowToast({ isShow: true, message: error?.message })

      setTimeout(() => {
        setShowToast({ isShow: false, message: "" })
      }, 2000)
    }
    !lastId && setIsLoading(false)
  }

  const onScroll = (e) => {
    const target = e.target;
    document.querySelectorAll('video').forEach(v => { v.pause() });

    const loadMore = async () => {
      setOnLoadMore(true)
      selectedType ? await getFeedsbyType(olderThan) : await getFeeds(groupDetail.id, false);
      setOnLoadMore(false)
    };

    const hasMore = olderThan ? true : false;

    if (!onLoadMore && hasMore) {
      loadMoreValidator(target, 50, () => {
        loadMore();
      });
    }
  };

  return {
    olderThan,
    onLoadMore,
    setOlderThan,
    setOnLoadMore,
    onScroll,
    feeds,
    setFeeds,
    scrollPosition,
    setScrollPosition,
    isLoading,
    setIsLoading,
    selectedType,
    setSelectedType,
    currentTab,
    setCurrentTab,
    groupDetail,
    setGroupDetail,
    showToast,
    setShowToast
  }
}

function CultureProvider(props) {
  let initialValue = {
    olderThan: 0,
    onLoadMore: false,
    feeds: [],
    scrollPosition: 0,
    isLoading: false,
    selectedType: "recent",
    currentTab: "recent",
    groupDetail: {
      id: -1,
      name: "General",
      type: "Open",
      allowPostAsAdmin: null,
    },
    showToast: { isShow: false, message: "" }
  };

  const [state, setState] = React.useState(initialValue);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <CultureContext.Provider value={contextValue} {...props} />;
}

export { useCulture, CultureProvider };
