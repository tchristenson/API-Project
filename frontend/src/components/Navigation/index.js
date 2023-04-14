// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="sessionUser-nav-links">
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
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <body>
      <header>
        <div className="masthead">
          <div className="masthead__home-button">
            <h2>
              <NavLink exact to="/">
              Meetup
            </NavLink>

              </h2>
          </div>
          <div className="masthead__actions">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </header>
    </body>
  );
}

export default Navigation;
