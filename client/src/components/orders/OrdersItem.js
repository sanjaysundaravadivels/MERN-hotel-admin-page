import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OrderDetailsChef from "./OrderDetailsChef";
import OrderDetailsDelivery from "./OrderDetailsDelivery";
const OrdersItem = ({
  order,
  item,
  index,
  role,
  chefComplete,
  deliveryComplete,
  adminComplete,
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const setting = (id) => {
    if (role === "chef") {
      setModalShow(false);
      chefComplete(id);
    }
    if (role === "delivery") {
      setModalShow(false);
      deliveryComplete(id);
    }
    if (role === "admin") {
      setModalShow(false);
      adminComplete(id);
    }
  };
  return (
    <Fragment>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => setModalShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row ">
          {role === "chef" ? (
            order.map((it, index) => {
              return <OrderDetailsChef index={index} it={it} />;
            })
          ) : (
            <OrderDetailsDelivery item={item} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setting(item._id)}>
            {role === "admin" ? "Delete" : "Completed"}
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        class="col-lg-4 col-md-6 d-flex align-items-stretch"
        style={{ marginBottom: "1rem", height: "fit-content" }}
        key={index}
        onClick={() => setModalShow(true)}
      >
        <div class="icon-box">
          <div class="icon">
            <h4 style={{ color: "blue" }}>{index + 1}</h4>
          </div>
          <h4 style={{ color: "white" }}>Order Time : {item.time}</h4>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersItem;
