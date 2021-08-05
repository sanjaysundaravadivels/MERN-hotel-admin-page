import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  let role = "admin";
  if (user) {
    role = user.role;
  }
  const adminLinks = (
    <ul>
      <li>
        <Link to="/profiles">Employees</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/adminleave">Requests</Link>
      </li>
      <li>
        <Link to="/orders">Orders</Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </li>
    </ul>
  );
  const chefLinks = (
    <ul>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/orders">Orders</Link>
      </li>
      <li>
        <Link to="/leave">Apply Leave</Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </li>
    </ul>
  );
  const deliveryLinks = (
    <ul>
      <li>
        <Link to="/orders">Orders</Link>
      </li>
      <li>
        <Link to="/leave">Apply Leave</Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </li>
    </ul>
  );

  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <div>
      <nav className="navbar bg-dark">
        <Link to="/dashboard">
          <h1>
            <i className="fas fa-code"></i> Royal Chettinad
          </h1>
        </Link>
        {!loading && (
          <Fragment>
            {role === "admin"
              ? adminLinks
              : role === "chef"
              ? chefLinks
              : deliveryLinks}
          </Fragment>
        )}
      </nav>
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
