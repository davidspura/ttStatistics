import React from "react";
import GraphView from "components/Graph";

function App() {
  return (
    <div>
      <GraphView show="downloads" />
      <GraphView showAdditionalData={true} show="subscriptions" />
    </div>
  );
}

export default App;
