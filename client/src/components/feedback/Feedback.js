import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {
  addFeedback,
  getFeedback,
  deleteFeedback,
} from "../../actions/feedback";
const initialState = {
  text: "",
};
const Feedback = ({
  feedback: { feedback, loading },
  addFeedback,
  getFeedback,
  deleteFeedback,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [modalShow, setModalShow] = useState(true);
  const [formEnable, setFormEnable] = useState(false);
  const { text } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addFeedback(formData, history);
  };

  const closing = () => {
    setModalShow(false);
    history.push("/dashboard");
  };

  return (
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
            Give your Feedback
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row ">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                name="text"
                value={text}
                onChange={onChange}
                placeholder="Enter your feedback"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Feedback.propTypes = {
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
})(withRouter(Feedback));
