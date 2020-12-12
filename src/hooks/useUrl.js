import React from "react";
import { useRouteMatch } from "react-router";

function useUrl() {
  let { url, params } = useRouteMatch();
  if (params.objectiveId) {
    url = url.substring(0, url.lastIndexOf("/"));
  }

  const match = useRouteMatch(`${url}/:objectiveId`);
  url = url.replace("/detail", "");
  const matchParent = useRouteMatch(`${url}/detail`);

  url = url
    .replace("/edit", "")
    .replace("/addgoal", "")
    .replace("/addtask", "");

  return { url, match, matchParent };
}

export { useUrl };
