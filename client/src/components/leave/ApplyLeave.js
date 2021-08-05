import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import {
  addLeaveRequest,
  getLeaveRequest,
  deleteleaveRequest,
} from "../../actions/leave";
const initialState = {
  date: "",
  reason: "",
};
const ApplyLeave = ({
  addLeaveRequest,
  getLeaveRequest,
  deleteleaveRequest,
  history,
}) => {
  useEffect(() => {
    getLeaveRequest();
  }, [getLeaveRequest]);
  const [formData, setFormData] = useState(initialState);
  const [modalShow, setModalShow] = useState(true);
  const [formEnable, setFormEnable] = useState(false);
  const { date, reason } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addLeaveRequest(formData, history);
    history.push("/dashboard");
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
            Apply leave
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row ">
          <Form onSubmit={onSubmit}>
            <FormGroup className="mb-3" controlId="date" bsSize="large">
              <Form.Label>Date</Form.Label>
              <FormControl
                type="date"
                name="date"
                value={date}
                onChange={onChange}
              />
            </FormGroup>
            <Form.Group className="mb-3" controlId="Reason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                name="reason"
                value={reason}
                onChange={onChange}
                placeholder="Enter the reason"
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

ApplyLeave.propTypes = {
  addLeaveRequest: PropTypes.func.isRequired,
  getLeaveRequest: PropTypes.func.isRequired,
  deleteleaveRequest: PropTypes.func.isRequired,
  leave: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  leave: state.leave,
});

export default connect(mapStateToProps, {
  addLeaveRequest,
  getLeaveRequest,
  deleteleaveRequest,
})(withRouter(ApplyLeave));
