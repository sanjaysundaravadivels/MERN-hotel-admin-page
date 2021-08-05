import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import chef from "../dashboard/chef.png";
import delivery from "../dashboard/delivery.jpg";
import admin from "../dashboard/admin.jpg";

import { getProfiles, getUsers } from "../../actions/profile";
const Profiles = ({
  getProfiles,
  getUsers,
  profile: { profiles, loading, users },
}) => {
  useEffect(() => {
    getProfiles();
    getUsers();
  }, [getProfiles, getUsers]);

  if (profiles === null) {
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
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section id="doctors" className="doctors bg-dark text-light">
            <div className="container" style={{ marginTop: "15rem" }}>
              <div className="section-title">
                <h2>Employees</h2>
              </div>

              <div className="row">
                {users.map((item) => {
                  const { _id, name, email, role } = item;
                  return (
                    <div className="col-lg-6">
                      <div className="member d-flex align-items-start">
                        <div className="pic">
                          <img
                            src={
                              role === "chef"
                                ? chef
                                : role === "delivery"
                                ? delivery
                                : admin
                            }
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="member-info">
                          <h4
                            style={{
                              color: "white",
                              textTransform: "capitalize",
                            }}
                          >
                            {name}{" "}
                          </h4>
                          <span
                            style={{
                              color: "white",
                              textTransform: "capitalize",
                            }}
                          >
                            {role}{" "}
                          </span>
                          <p>{email}</p>
                          <div style={{ margin: "1rem 0" }}>
                            <Link to={`profileitem/${_id}`}>
                              <Button variant="outline-light" type="submit">
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profiles: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getUsers })(Profiles);
