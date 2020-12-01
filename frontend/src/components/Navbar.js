import React from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "./Modal";
import AuthenticationDialog from "./AuthenticationDialog";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  //const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const auth = useAuth();
  const { modal, toggleModal } = auth;
  const { cartItems } = useCart();
  const location = useLocation();

  // const toggleModal = () => {
  //   document.documentElement.classList.toggle("is-clipped");
  //   setModal(!modal);
  // };

  let navbarMenu;
  function toggleNavbar(e) {
    navbarMenu.classList.toggle("is-active");
    e.target.classList.toggle("is-active");
  }
  return (
    <>
      <nav
        className="navbar is-spaced has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <span className="is-size-4 has-text-weight-bold">JABS</span>
            </Link>

            <a
              onClick={toggleNavbar}
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu" ref={(el) => (navbarMenu = el)}>
            <div className="navbar-start"></div>

            <div className="navbar-end">
              {auth.user ? (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">{auth.user.name}</a>

                  <div className="navbar-dropdown">
                    <Link to="/account/orders" className="navbar-item">
                      My Orders
                    </Link>
                    <Link to="/account/profile" className="navbar-item">
                      Profile
                    </Link>

                    <hr className="navbar-divider" />
                    <a className="navbar-item" onClick={() => auth.signout()}>
                      Sign out
                    </a>
                  </div>
                </div>
              ) : (
                <div className="navbar-item">
                  <button onClick={toggleModal} className="button is-link">
                    Sign in / Sign up
                  </button>
                </div>
              )}
              {auth.user && auth.user.role === "admin" && (
                <div className="navbar-item">
                  <Link to="/admin/orders" className="button is-info">
                    Admin Dashboard
                  </Link>
                </div>
              )}
              {location.pathname !== "/checkout" && (
                <div className="navbar-item">
                  <Link to="/cart" className="button">
                    Cart {cartItems.length > 0 && `(${cartItems.length})`}
                  </Link>
                </div>
              )}

              {/* <div className="navbar-item">
                <div className="buttons">
                  <Link to="/admin/orders" className="button is-info">
                    Admin Dashboard
                  </Link>
                  <Link to="/cart" className="button">
                    Cart
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
      {!auth.user && (
        <Modal show={modal} width="400px" handleClose={toggleModal}>
          <AuthenticationDialog />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
