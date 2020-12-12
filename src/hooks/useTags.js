import TagClient from "client/TagClient";
import { useQuery } from "react-query";

export default function useTags() {

  // GET OBJECTIVES PAGINATION
  const getTags = ({ q }) => {

    const fetchTags = async (_, { q }) => {
      let params = { q };

      const { data } = await TagClient.getTags(params);
      return [ data.predefined, data.others ]
    };

    const {
      data,
      status,
      isFetching,
      refetch
    } = useQuery(['tags', { q }], fetchTags)

    return {
      data,
      status,
      isFetching,
      refetch
    };
  };

  return { getTags };
}