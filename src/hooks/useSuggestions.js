import { getObjectiveUserSugestion } from "client/SuggestionClient";
import { useInfiniteQuery } from "react-query";

export default function useSuggestions() {

  // GET OBJECTIVES PAGINATION
  const getUserSuggestions = ({ role, excludeArray, type, assigneeId, q }) => {

    const fetchUserSuggestions = (_, { q, excludeArray }, olderThan) => {
      let params = {
        role: role,
        exclude: excludeArray,
        type: type,
        limit: 20,
        q: q,
        ...(role === "assigner" && { assigneeId: assigneeId } ),
        ...olderThan,
      };

      return getObjectiveUserSugestion(params);
    };

    const {
      data,
      status,
      isFetching,
      isFetchingMore,
      fetchMore,
      canFetchMore,
      refetch
    } = useInfiniteQuery(["userSuggestions", { q, excludeArray }], fetchUserSuggestions, {
      getFetchMore: lastData => lastData.pagination.next
    });

    return {
      data,
      status,
      isFetching,
      isFetchingMore,
      fetchMore,
      canFetchMore,
      refetch
    };
  };

  return { getUserSuggestions };
}
