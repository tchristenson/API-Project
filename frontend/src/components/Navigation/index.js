// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../Search";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="sessionUser-nav-links">
        <NavLink exact to="/about">
          About
        </NavLink>
        <NavLink exact to="/groups/new">
          Start a new group
        </NavLink>
        <li>
          <ProfileButton user={sessionUser} />
        </li>

      </div>
    );
  } else {
    sessionLinks = (
      <li className="login-signup-buttons">
        <NavLink className={'about-button'} exact to="/about">
          About
        </NavLink>

        <OpenModalButton
          className="login-button"
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          className="signup-button"
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (

      <header>
        <div className="masthead">

          <h2>
            <NavLink className="masthead__home-button" exact to="/">
              Come Together Right Now
            </NavLink>
          </h2>

          <Search />

          <div className="masthead__actions">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </header>

  );
}

export default Navigation;
