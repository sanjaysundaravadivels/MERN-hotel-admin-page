import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import img1 from "./orders.jpg";
import img2 from "./feedback.jpg";
import img3 from "./profile.jpeg";
const Experience = ({ profile }) => {
  return (
    <Fragment>
      <Carousel
        variant="dark"
        style={{ width: "18rem", marginLeft: "auto", marginRight: "auto" }}
      >
        <Carousel.Item>
          <Link to="/adduser">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={img1}
                style={{
                  height: "5rem",
                  width: "5rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Card.Body>
                <Card.Title>Add user</Card.Title>
                <Card.Text>
                  Add user to the database
                  <br /> <br />{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/feedbackadmin">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={img2}
                style={{
                  height: "5rem",
                  width: "5rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Card.Body>
                <Card.Title>Feedback</Card.Title>
                <Card.Text>
                  Check feedbacks arrived
                  <br /> <br />{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to={`/adminleave`}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={img3}
                style={{
                  height: "5rem",
                  width: "5rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Card.Body>
                <Card.Title>Leave requests</Card.Title>
                <Card.Text>
                  Clik here to check leave requests arrived <br /> <br />{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Carousel.Item>
      </Carousel>
    </Fragment>
  );
};

Experience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default connect(null)(Experience);
