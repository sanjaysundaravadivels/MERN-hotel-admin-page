import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";

import {
  addFeedback,
  getFeedback,
  deleteFeedback,
} from "../../actions/feedback";
const FeedbcakAdmin = ({
  feedback: { feedback, loading },
  addFeedback,
  getFeedback,
  deleteFeedback,
  history,
}) => {
  useEffect(() => {
    getFeedback();
  }, [getFeedback]);
  const [modalShow, setModalShow] = useState(true);
  const closing = () => {
    setModalShow(false);
    history.push("/dashboard");
  };
  const deleting = (id) => {
    deleteFeedback(id);
    window.location.reload();
  };
  if (feedback === null) {
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
              Feedback
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="row ">
            <Fragment>
              <Carousel variant="dark" style={{ padding: "1rem" }}>
                {feedback.map((post, index) => {
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
                        <Card.Header style={{ margin: "auto", color: "white" }}>
                          <Card.Title style={{ color: "white" }}>
                            Feedback - {index + 1}
                          </Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text style={{ textAlign: "center" }}>
                            {post.text}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer style={{ margin: "auto" }}>
                          <Button
                            variant="primary"
                            onClick={() => deleting(post._id)}
                          >
                            Delete
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
  );
};

FeedbcakAdmin.propTypes = {
  addFeedback: PropTypes.func.isRequired,
  getFeedback: PropTypes.func.isRequired,
  deleteFeedback: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  feedback: state.feedback,
});

export default connect(mapStateToProps, {
  addFeedback,
  getFeedback,
  deleteFeedback,
})(withRouter(FeedbcakAdmin));
