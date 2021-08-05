import React, { Fragment, useState, useEffect } from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
  gender: "",
  dob: "",
  blood: "",
  address: "",
  phone: 0,
  aadhar: 0,
};

const CreateProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useRouteMatch("/create-profile");

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const { gender, dob, blood, address, phone, aadhar } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <div
        className="bg-dark text-light"
        style={{ marginTop: "15rem", padding: "1rem", opacity: "0.9" }}
      >
        <h1 className="large text-primary">
          {creatingProfile ? "Create Your Profile" : "Edit Your Profile"}
        </h1>
        <p className="lead">
          <i className="fas fa-user" />
          {creatingProfile
            ? ` Let's get some information to make your`
            : " Add some changes to your profile"}
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <select name="gender" value={gender} onChange={onChange}>
              <option>* Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">Select your Gender</small>
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Your Date of birth"
              name="dob"
              value={dob}
              onChange={onChange}
            />
            <small className="form-text">Enter your Birthdate</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="blood"
              name="blood"
              value={blood}
              onChange={onChange}
              required
            />
            <small className="form-text">Enter your Blood Group</small>
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              required
            />
            <small className="form-text">Enter your phone Number</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={onChange}
              required
            />
            <small className="form-text">Your address</small>
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Aadhar number"
              name="aadhar"
              value={aadhar}
              onChange={onChange}
              required
            />
            <small className="form-text">Your aadhar card number</small>
          </div>

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
