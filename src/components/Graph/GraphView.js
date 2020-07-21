import React, { useState, useEffect } from "react";
import { getStats, getSubs } from "modules/statisticsData/cloud";
import { getDownloadData, getSubsData } from "./getFormatedData";
import Graph from "./Graph";

export default function GraphView({ show, showAdditionalData }) {
  const FIFTEEN_MINUTES = 60 * 15000;

  const [statisticsData, setStatisticsData] = useState([]);
  const [subsData, setSubsData] = useState([]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    async function getData() {
      setStatisticsData(await getStats());
      setSubsData(await getSubs());
    }
    getData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), FIFTEEN_MINUTES);
    return () => {
      clearInterval(interval);
    };
  }, [FIFTEEN_MINUTES]);

  let data;
  let keys;
  let index;
  if (show === "downloads") {
    data = getDownloadData(statisticsData);
    keys = ["ios", "android", "web"];
    index = "createdAt";
  } else if (show === "subscriptions") {
    data = getSubsData(subsData)["graphSubsData"];
    keys = ["subs", "trial", "renewal"];
    index = "graphIndex";
  }
  const todayData = getSubsData(subsData)["additionalInfoToday"];
  const yesterdayData = getSubsData(subsData)["additionalInfoYesterday"];

  const getElementsForData = ({ day, type, showDivider = true }) => {
    return (
      <>
        <div>{`android ${type}:` + day[`android ${type}`]}</div>
        <div>{`ios ${type}:` + day[`ios ${type}`]}</div>
        <div>{`web ${type}:` + day[`web ${type}`]}</div>
        {showDivider && <div className="divider" />}
      </>
    );
  };

  const displayData = (day) => {
    return (
      <div className="display-data">
        {getElementsForData({ day: day[0], type: "subscriptions" })}
        {getElementsForData({ day: day[1], type: "trial" })}
        {getElementsForData({
          day: day[2],
          type: "renewal",
          showDivider: false,
        })}
      </div>
    );
  };

  return (
    <>
      <Graph data={data} keys={keys} index={index} show={show} />
      {showAdditionalData && (
        <div className="additionalData">
          <div className="additionalDataToday">
            {displayData(yesterdayData)}
          </div>
          <div className="additionalDataYesterday">
            {displayData(todayData)}
          </div>
        </div>
      )}
    </>
  );
}
