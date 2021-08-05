import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, logout } from "../../actions/auth";
import { FaUser } from "react-icons/fa";
import Overlay from "react-bootstrap/Overlay";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
const Login = ({ login, logout, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="ftco-section main">
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
                <h3 className="text-center mb-4 text-light">Sign In</h3>
                <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control rounded-left forrm"
                      placeholder="your mail id"
                      value={email}
                      name="email"
                      onChange={(e) => onChange(e)}
                      required
                    />
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
                      Login
                    </button>
                  </div>
                  <div className="form-group d-flex align-items-center justify-content-center ">
                    <Overlay show={show} placement="right">
                      <Tooltip id="overlay-example">My Tooltip</Tooltip>
                    </Overlay>
                    <div className="w-50 text-md-right">
                      <Button
                        className=" btn btn-primary rounded submit "
                        ref={target}
                        onClick={() => setShow(!show)}
                      >
                        Forgot Pasaword
                      </Button>
                      <Overlay
                        target={target.current}
                        show={show}
                        placement="bottom"
                      >
                        {({
                          placement,
                          arrowProps,
                          show: _show,
                          popper,
                          ...props
                        }) => (
                          <div
                            {...props}
                            style={{
                              backgroundColor: "rgba(255, 100, 100, 0.85)",
                              padding: "2px 10px",
                              color: "white",
                              borderRadius: 3,
                              ...props.style,
                            }}
                          >
                            Contact your administrator
                          </div>
                        )}
                      </Overlay>
                    </div>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logou: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, logout })(Login);
