// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router";
import './Navigation.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className="dropdown">
      <button onClick={openMenu}>
        <i id="font-awesome-profile-button" className="fa-sharp fa-solid fa-user"></i>
        {showMenu ? (
          <i id="font-awesome-angle-up-button" className="fa-solid fa-angle-up"></i>
        ) : (
          <i id="font-awesome-angle-down-button" className="fa-solid fa-angle-down"></i>
        )}

      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.firstName}</li>
        <li>{user.email}</li>
        <li id="groups-navlink-in-profile-button">
          <NavLink exact to="/groups">
            View groups
          </NavLink>
        </li>
        <li id="events-navlink-in-profile-button">
          <NavLink exact to="/events">
            View events
          </NavLink>
        </li>
        <li id="profile-navlink-in-profile-button">
          <NavLink exact to={`/users/${sessionUser.id}`}>
            Your profile
          </NavLink>
        </li>
        <li className="logout-in-profile-dropdown">
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
    </>
  );
}

export default ProfileButton;
