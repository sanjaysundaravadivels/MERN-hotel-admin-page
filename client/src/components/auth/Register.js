import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
const Register = ({ setAlert, register, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const { name, email, role, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      role,
      password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/users", body, config);
      console.log(res.data);
      history.push("/dashboard");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Fragment>
      <section className="ftco-section main" style={{ marginTop: "15rem" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5 ">
              <h2 className="heading-section">Royal Chettinad</h2>
            </div>
          </div>
          <div
            className="row justify-content-center "
            style={{ marginTop: "-2rem" }}
          >
            <div className="col-md-7 col-lg-5 ">
              <div className="login-wrap p-4 p-md-5 bg-dark forrm">
                <div className="icon d-flex align-items-center justify-content-center ">
                  <span className="fa fa-user-o">
                    <FaUser />
                  </span>
                </div>
                <h3 className="text-center mb-4 text-light">Register</h3>
                <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control rounded-left forrm"
                      placeholder="Name"
                      value={name}
                      name="name"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control rounded-left forrm"
                      placeholder="Mail id"
                      value={email}
                      name="email"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group ">
                    <select
                      className="form-control rounded-left"
                      name="role"
                      value={role}
                      onChange={onChange}
                    >
                      <option>* Select Role</option>
                      <option value="chef">chef</option>
                      <option value="delivery">delivery</option>
                    </select>
                  </div>
                  <div className="form-group d-flex ">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      name="password"
                      minLength="6"
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary rounded submit px-3"
                      value="Login"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
