import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardActions from "../DashboardActions";
import ExperienceAdmin from "../ExperienceAdmin";
import Card from "react-bootstrap/Card";

import Spinner from "../../layout/Spinner";
import { getCurrentProfile, deleteAccount } from "../../../actions/profile";
const Dashadmin = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <main className="dashboard">
      <Card
        style={{
          margin: "auto",
          marginTop: "15rem",
          width: "fit-content",

          textAlign: "center",
          justifyContent: "center",
        }}
        className="bg-dark "
      >
        <Card.Body>
          <Card.Title>
            <h1 className="large text-primary">Dashboard</h1>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-light">
            <p className="lead">
              <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
          </Card.Subtitle>
          <Card.Text>
            {profile !== null ? (
              <Fragment>
                <ExperienceAdmin experience={profile} />
                <div className="my-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                  >
                    <i className="fas fa-user-minus" /> Delete My Account
                  </button>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  Create Profile
                </Link>
              </Fragment>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </main>
  );
};

Dashadmin.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashadmin
);
