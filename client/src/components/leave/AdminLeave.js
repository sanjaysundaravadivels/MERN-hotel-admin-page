import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Moment from "react-moment";
import Spinner from "react-bootstrap/Spinner";

import {
  addLeaveRequest,
  getLeaveRequest,
  deleteleaveRequest,
} from "../../actions/leave";
import { getUsers } from "../../actions/profile";
const ApplyLeave = ({
  leave: { leaveRequests, loading },
  profile: { users },
  getUsers,
  addLeaveRequest,
  getLeaveRequest,
  deleteleaveRequest,
  history,
}) => {
  useEffect(() => {
    getLeaveRequest();
    getUsers();
  }, [getLeaveRequest, getUsers]);
  const [modalShow, setModalShow] = useState(true);
  const closing = () => {
    setModalShow(false);
    history.push("/dashboard");
  };
  const deleting = (id) => {
    deleteleaveRequest(id);
  };
  if (leaveRequests === null || users === null) {
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
  return (
    <Fragment>
      <div style={{ marginTop: "15rem" }}>
        <Fragment>
          <Modal
            className="bg-dark"
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton onClick={() => closing()}>
              <Modal.Title id="contained-modal-title-vcenter">
                LeaveRequests
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="row ">
              <Fragment>
                <Carousel variant="dark" style={{ padding: "1rem" }}>
                  {leaveRequests.map((post, index) => {
                    const newuser = users.filter((it) => it._id === post.user);
                    const user = newuser[0];

                    return (
                      <Carousel.Item>
                        <Card
                          className="bg-dark text-light"
                          style={{
                            width: "18rem",
                            minHeight: "15rem",
                            margin: "auto",
                          }}
                        >
                          <Card.Header
                            style={{ margin: "auto", color: "white" }}
                          >
                            <Card.Title style={{ color: "white" }}>
                              Request - {index + 1}
                            </Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {user.name} -- {user.role}
                            </Card.Text>
                            <Card.Text style={{ textAlign: "center" }}>
                              <Moment format="DD-MM-YYYY">{post.date}</Moment>
                            </Card.Text>
                            <Card.Text style={{ textAlign: "center" }}>
                              {post.reason}
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer style={{ margin: "auto" }}>
                            <Button
                              variant="primary"
                              onClick={() => deleting(post._id)}
                            >
                              Accept
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Fragment>
            </Modal.Body>
          </Modal>
        </Fragment>
      </div>
    </Fragment>
  );
};

ApplyLeave.propTypes = {
  addLeaveRequest: PropTypes.func.isRequired,
  getLeaveRequest: PropTypes.func.isRequired,
  deleteleaveRequest: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  leave: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  leave: state.leave,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLeaveRequest,
  getLeaveRequest,
  deleteleaveRequest,
  getUsers,
})(withRouter(ApplyLeave));
