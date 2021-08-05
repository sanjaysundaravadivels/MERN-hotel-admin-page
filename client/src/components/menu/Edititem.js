import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createMenuItem } from "../../actions/menu";

const Edititem = ({
  menu: { menu, loading },
  createMenuItem,
  history,
  item,
  setModalShow,
  modalShow,
}) => {
  const initialState = {
    title: item.title,
    img: item.img,
    category: item.category,
    desc: item.desc,
    price: item.price,
  };
  const [formData, setFormData] = useState(initialState);
  const { img, desc, price, category } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createMenuItem(formData, history, item ? true : false);
    history.push("/dashboard");
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
            Edit {item.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row ">
          <Form onSubmit={onSubmit}>
            <div className="mb-3 row">
              <Form.Group className="col" controlId="formGridEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={category}
                  onChange={onChange}
                  type="text"
                  placeholder="Enter Category"
                />
              </Form.Group>

              <Form.Group className="col" controlId="formGridPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  value={price}
                  onChange={onChange}
                  type="number"
                  placeholder="Price"
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Image Link</Form.Label>
              <Form.Control
                name="img"
                value={img}
                onChange={onChange}
                placeholder="drive link"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="desc"
                value={desc}
                onChange={onChange}
                placeholder="Description"
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

Edititem.propTypes = {
  createMenuItem: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
});

export default connect(mapStateToProps, { createMenuItem })(
  withRouter(Edititem)
);
