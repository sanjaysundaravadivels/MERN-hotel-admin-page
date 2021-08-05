import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Dashdelivery from "./delivery/Dashdelivery";
import Dashchef from "./chef/Dashchef";
import Dashadmin from "./admin/Dashadmin";
import Spinner from "react-bootstrap/Spinner";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  if (profile === null) {
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
  const role = user ? user.role : "admin";
  if (loading) {
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
  if (role === "admin") {
    return <Dashadmin />;
  }

  if (role === "chef") {
    return <Dashchef />;
  } else {
    return <Dashdelivery />;
  }
};

Dashboard.propTypes = {
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
  Dashboard
);
