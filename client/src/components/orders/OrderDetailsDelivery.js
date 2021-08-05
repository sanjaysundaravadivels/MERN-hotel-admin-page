import React from "react";
import Card from "react-bootstrap/Card";

const OrderDetailsDelivery = ({ item }) => {
  const { name, address, email, total, phone } = item;
  return (
    <div>
      <Card
        border="warning"
        className="bg-dark text-light"
        style={{
          width: "25rem",
          margin: "auto",
        }}
      >
        <Card.Header style={{ margin: "auto" }}>Name: {name} </Card.Header>
        <Card.Text style={{ marginLeft: "1rem" }}>
          <h5 style={{ color: "white" }}>Mail: {email}, </h5>
          <h5 style={{ color: "white" }}>Phone number: {phone}, </h5>
          <h5 style={{ color: "white" }}>Address: {address}. </h5>
        </Card.Text>
        <Card.Footer className="text-light">
          Amount to be paid : {total}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default OrderDetailsDelivery;
