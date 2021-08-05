import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getMenu, deleteMenuItem } from "../../actions/menu";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Edititem from "./Edititem";

const Menu = ({
  getMenu,
  deleteMenuItem,
  menu: { menu, loading },
  history,
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [menuItem, setMenuItem] = React.useState({});
  useEffect(() => {
    getMenu();
  }, [getMenu]);
  const settingItem = (item) => {
    setMenuItem(item);
    setModalShow(true);
  };
  const deleteItem = (id) => {
    deleteMenuItem(id);
    history.push("/dashboard");
  };
  if (menu === null) {
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
          <div className="menu bg-dark" style={{ marginTop: "15rem" }}>
            <section id="portfolio" class="portfolio">
              <div class="container">
                <div class="section-title">
                  <h2>Menu</h2>
                </div>

                <div class="row">
                  <div class="col-lg-12 d-flex justify-content-center">
                    <ul id="portfolio-flters">
                      <Link to="/createmenu">
                        <li data-filter="*" class="filter-active">
                          Add an Item
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>

                <div class="row portfolio-container">
                  {menu.map((item, index) => {
                    const { _id, title, img, desc, price } = item;
                    const myArr = img.split("/");
                    const url = `https://drive.google.com/thumbnail?id=${myArr[5]}`;
                    return (
                      <div
                        class="col-lg-4 col-md-6 portfolio-item filter-card"
                        style={{ padding: "0 2rem" }}
                      >
                        {modalShow && (
                          <Edititem
                            item={menuItem}
                            setModalShow={setModalShow}
                            modalShow={modalShow}
                          />
                        )}
                        <div
                          class="portfolio-wrap"
                          style={{ width: "15rem", padding: "1rem" }}
                        >
                          <img
                            src={url}
                            class="img-fluid"
                            alt=""
                            style={{ height: "15rem", width: "15rem" }}
                          />
                          <div class="portfolio-info">
                            <h4>{title}</h4>
                            <p>₹ {price}</p>
                            <div class="portfolio-links">
                              <a
                                onClick={() => deleteItem(_id)}
                                data-gallery="portfolioGallery"
                                class="portfolio-lightbox"
                                title="Delete item"
                              >
                                <AiFillDelete />
                              </a>
                              <a
                                onClick={() => settingItem(item)}
                                data-gallery="portfolioDetailsGallery"
                                data-glightbox="type: external"
                                class="portfolio-details-lightbox"
                                title="Edit item"
                              >
                                <AiFillEdit />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Menu.propTypes = {
  menu: PropTypes.object.isRequired,
  getMenu: PropTypes.func.isRequired,
  deleteMenuItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
});

export default connect(mapStateToProps, { getMenu, deleteMenuItem })(Menu);
