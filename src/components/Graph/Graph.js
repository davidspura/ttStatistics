import React from "react";
import getGraphColors from "./getGraphColors";
import { ResponsiveBar } from "@nivo/bar";

export default function Graph({ data = [], keys = [], index = "", show }) {
  return (
    <div className="graph-resolution">
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={index}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={(data) => {
          return getGraphColors(data) === undefined ? "" : getGraphColors(data);
        }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "dny",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: show === "downloads" ? " stažení" : "předplatné",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={8}
        labelSkipHeight={8}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}
