// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router";
import './Navigation.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

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
        <i id="font-awesome-profile-button" class="fa-sharp fa-solid fa-user"></i>
        {showMenu ? (
          <i id="font-awesome-angle-up-button" class="fa-solid fa-angle-up"></i>
        ) : (
          <i id="font-awesome-angle-down-button" class="fa-solid fa-angle-down"></i>
        )}

      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.firstName}</li>
        <li>{user.email}</li>
        <li className="logout-in-profile-dropdown">
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
    </>
  );
}

export default ProfileButton;
