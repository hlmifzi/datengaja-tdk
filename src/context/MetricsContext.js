import React, { useEffect, useState } from "react";
import produce from "main/hooks/node_modules/immer";
import {
  getListMeasurement,
  getObjectiveCategory
} from "main/hooks/node_modules/client/ObjectivesClient";
import LoadingComponent from "oldComponents/LoadingComponent";
import { useAsync } from "react-async";
import { useUser } from "./UserContext";

//CREATE CONTEXT
const MetricsContext = React.createContext();

async function getMetrics({ metricOptions }) {
  let list = [];
  if (metricOptions.includes("all")) {
    const { data } = await getListMeasurement();
    if (data) {
      list.push(...data)
    }
  }
  if (metricOptions.includes("no_metric")) {
    list.unshift({
      id: 0,
      description: "No Metrics",
      unit: "",
      unitIcon: null
    });
  }
  return list
}

async function getType() {
  const { data } = await getObjectiveCategory();
  if (data) {
    return data;
  }
}

async function getData(metricOptions) {
  const metrics = await getMetrics(metricOptions);
  const types = await getType();
  const data = {
    listMetrics: metrics || [],
    objectiveCategories: types || []
  };
  return data;
}

//PROVIDER
function MetricsProvider(props) {
  const { config: { showMetricForObjective, showMetricForTask } } = useUser();
  let metricOptions = props.type === "goal" ? showMetricForObjective : showMetricForTask;
  let { data = null, isRejected, isPending, isSettled, reload } = useAsync({
    promiseFn: getData,
    metricOptions: metricOptions,
  });

  if (!data) {
    return <LoadingComponent />;
  }

  return <MetricsContext.Provider value={data} {...props} />;
}

//MUTATION
function useMetrics() {
  const context = React.useContext(MetricsContext);
  return context;
}

export { MetricsProvider, useMetrics };
