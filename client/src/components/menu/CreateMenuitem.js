import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createMenuItem, getMenu } from "../../actions/menu";
const initialState = {
  title: "",
  img: "",
  category: "",
  desc: "",
  price: 0,
};
const CreateMenuitem = ({
  menu: { menu, loading },
  createMenuItem,
  getMenu,
  history,
}) => {
  useEffect(() => {
    getMenu();
  }, [getMenu]);
  const [formData, setFormData] = useState(initialState);
  const [modalShow, setModalShow] = useState(true);
  const [formEnable, setFormEnable] = useState(false);
  const { title, img, desc, price, category } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createMenuItem(formData, history);
  };
  const newcategory = new Set(menu.map((item) => item.category));
  const closing = () => {
    setModalShow(false);
    history.push("/menu");
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
            Add new item to the menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="row ">
          <Form onSubmit={onSubmit}>
            <div className="mb-3 row">
              <Form.Group className="col" controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="title"
                  value={title}
                  onChange={onChange}
                  type="text"
                  placeholder="Enter Name of the item"
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
            <div className="mb-3 row">
              <Form.Group className="col">
                <Form.Check
                  type="checkbox"
                  id={`default-radio`}
                  name="current"
                  checked={formEnable}
                  label={`Add new Category`}
                  onChange={() => setFormEnable(!formEnable)}
                />
                <Form.Control
                  name="category"
                  value={category}
                  onChange={onChange}
                  placeholder="Category eg:lunch"
                  disabled={!formEnable}
                />
              </Form.Group>
              <Form.Group className="col" controlId="formGridState">
                <Form.Label>Select existing Category</Form.Label>
                <Form.Select disabled={formEnable} defaultValue="Choose...">
                  <option>Choose...</option>
                  {Array.from(newcategory).map((item) => {
                    return <option>{item} </option>;
                  })}
                </Form.Select>
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

CreateMenuitem.propTypes = {
  createMenuItem: PropTypes.func.isRequired,
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
});

export default connect(mapStateToProps, { createMenuItem, getMenu })(
  withRouter(CreateMenuitem)
);
