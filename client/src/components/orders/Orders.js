import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import {
  getOrders,
  getOrderStatus,
  addOrderStatus,
  deleteOrderStatus,
  deleteOrder,
} from "../../actions/orders";
import OrdersItem from "./OrdersItem";
const Orders = ({
  getOrders,
  getOrderStatus,
  addOrderStatus,
  deleteOrderStatus,
  deleteOrder,
  orders: { orders, loading, orderStatus },
  auth: { user },
  history,
}) => {
  const role = user ? user.role : "admin";
  useEffect(() => {
    getOrders();
    getOrderStatus();
  }, [getOrders, getOrderStatus]);
  let newOrders = [];
  if (role === "chef") {
    orders.map((item, index) => {
      const { _id } = item;
      const temp = orderStatus.filter((orderItem) => orderItem.order === _id);

      if (temp.length === 0) {
        newOrders[index] = item;
      }
    });
  }
  if (role === "delivery") {
    orders.map((item, index) => {
      const { _id } = item;
      const temp = orderStatus.filter(
        (orderItem) => orderItem.order === _id && orderItem.completed === true
      );

      if (temp.length !== 0) {
        newOrders[index] = item;
      }
    });
  }
  if (role === "admin") {
    newOrders = orders;
  }

  orders.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const chefComplete = (id) => {
    const neworderStatus = {
      order: id,
      completed: true,
    };
    addOrderStatus(neworderStatus);
    history.push("/dashboard");
  };
  const deliveryComplete = (id) => {
    const neworderStatus = {
      order: id,
      completed: false,
    };
    addOrderStatus(neworderStatus);
    history.push("/dashboard");
  };
  const adminComplete = (id) => {
    const temp = orderStatus.filter((orderItem) => orderItem.order === id);

    deleteOrderStatus(temp[0]._id);
    deleteOrder(id);
  };
  if (getOrders === null || getOrderStatus === null) {
    return (
      <Fragment>
        <Spinner
          style={{ marginTop: "20rem", marginLeft: "6rem" }}
          animation="border"
          variant="primary"
        />
        <Spinner
          style={{ marginTop: "20rem", marginLeft: "6rem" }}
          animation="border"
          variant="secondary"
        />
        <Spinner
          style={{ marginTop: "20rem", marginLeft: "6rem" }}
          animation="border"
          variant="success"
        />
        <Spinner
          style={{ marginTop: "20rem", marginLeft: "6rem" }}
          animation="border"
          variant="danger"
        />
        <Spinner
          style={{ marginTop: "20rem", marginLeft: "6rem" }}
          animation="border"
          variant="warning"
        />
        <Spinner
          style={{ marginTop: "20rem", marginLeft: "6rem" }}
          animation="border"
          variant="info"
        />
      </Fragment>
    );
  }
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="orders bg-dark" style={{ marginTop: "15rem" }}>
        <section id="services" class="services">
          <div class="container">
            <div class="section-title">
              <h2>Orders</h2>
            </div>
            <div class="row">
              {newOrders.map((item, index) => {
                const { order } = item;
                return (
                  <OrdersItem
                    key={index}
                    order={order}
                    item={item}
                    index={index}
                    role={role}
                    chefComplete={chefComplete}
                    deliveryComplete={deliveryComplete}
                    adminComplete={adminComplete}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  auth: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
  getOrderStatus: PropTypes.func.isRequired,
  addOrderStatus: PropTypes.func.isRequired,
  deleteOrderStatus: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
};

const mapStateProps = (state) => ({
  orders: state.orders,
  auth: state.auth,
});

export default connect(mapStateProps, {
  getOrders,
  getOrderStatus,
  addOrderStatus,
  deleteOrderStatus,
  deleteOrder,
})(Orders);
