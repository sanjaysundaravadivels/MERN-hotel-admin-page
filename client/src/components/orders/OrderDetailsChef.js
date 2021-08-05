import React from "react";
import Card from "react-bootstrap/Card";

const OrderDetailsChef = ({ index, it }) => {
  return (
    <Card
      border="warning"
      className="bg-dark text-light"
      style={{
        width: "16rem",
        margin: "1rem",
      }}
    >
      <Card.Header style={{ margin: "auto", color: "white" }}>
        {index + 1}{" "}
      </Card.Header>
      <Card.Text>
        <h5 style={{ color: "white" }}>Item : {it.title} </h5>
        <h5 style={{ color: "white" }}>Count : {it.count}</h5>
      </Card.Text>
    </Card>
  );
};

export default OrderDetailsChef;
