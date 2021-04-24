import React from "react";

import PremiumBarChart from "./PremiumBarChart.js";

import { Card } from "react-bootstrap";

function ShowPremiumStats(props) {

  return (
      <Card>
        <Card.Body>
          <PremiumBarChart
            filter={props.filter}
            zone={props.zone}
            initialDate={props.initialDate}
            endDate={props.endDate}
          />
        </Card.Body>
      </Card>
  );
}
export default ShowPremiumStats;
