import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";
import img1 from "./delivery.jpg";
import img2 from "./chef.png";
import { CgPushChevronRightO } from "react-icons/cg";
const Myprofile = ({ profile: { profile }, auth }) => {
  console.log(auth);
  const { name, email, role } = auth.user;
  const { aadhar, address, dob, gender, joindate, phone } = profile;
  const myArr = address.split(",");
  return (
    <div style={{ marginTop: "15rem" }}>
      <section id="about" className="about">
        <div className="about-me container">
          <div className="section-title">
            <h2>About</h2>
            <p>Hii {name}</p>
          </div>

          <div className="row">
            <div className="col-lg-4" data-aos="fade-right">
              <img
                src={role === "delivery" ? img1 : img2}
                style={{ height: "80%", width: "90%", opacity: "0.9" }}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
              <h3>
                {role === "delivery"
                  ? `Delivery boy at Royal Chettinad`
                  : "Chef at royal chettinad"}{" "}
              </h3>

              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <CgPushChevronRightO
                        style={{
                          color: "#18d26e",
                          fontSize: "larger",
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <strong>Name:</strong> <span>{name} </span>
                    </li>
                    <li>
                      <CgPushChevronRightO
                        style={{
                          color: "#18d26e",
                          fontSize: "larger",
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <strong>Gender:</strong> <span>{gender} </span>
                    </li>
                    <li>
                      <CgPushChevronRightO
                        style={{
                          color: "#18d26e",
                          fontSize: "larger",
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <strong>Birthday:</strong>{" "}
                      <span>
                        <Moment format="DD-MM-YYYY">{dob}</Moment>{" "}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <CgPushChevronRightO
                        style={{
                          color: "#18d26e",
                          fontSize: "larger",
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <strong>Phone:</strong> <span>{phone} </span>
                    </li>
                    <li>
                      <CgPushChevronRightO
                        style={{
                          color: "#18d26e",
                          fontSize: "larger",
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <strong>Email:</strong> <span>{email} </span>
                    </li>
                    <li>
                      <CgPushChevronRightO
                        style={{
                          color: "#18d26e",
                          fontSize: "larger",
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <strong>Join-date</strong>{" "}
                      <span>
                        {" "}
                        <Moment format="DD-MM-YYYY">{joindate}</Moment>{" "}
                      </span>
                    </li>
                  </ul>
                </div>
                <Card
                  style={{
                    width: "20rem",
                    height: "fit-content",
                    background: "none",
                    textAlign: "justify",
                    margin: "0 100px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <strong style={{ color: "white" }}>Address:</strong>
                    </Card.Title>
                    <Card.Text>
                      {myArr.map((item) => {
                        return <span>{item},</span>;
                      })}{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <div class="text-center">
                  {" "}
                  <Link to="/edit-profile">
                    <button className="butt">Edit Profile</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Myprofile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(Myprofile);
