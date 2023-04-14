// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        closeModal();
        history.push('/');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoUser = () => {
    setCredential('DemoUser')
    setPassword('password')
  }

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form className="credentials-container" onSubmit={handleSubmit}>
        <div className="credentials-errors">
          {errors.credential && (
            <p>{errors.credential}</p>
          )}
        </div>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>
          Log In
        </button>
        <button className='demo-user-button' type="submit" onClick={handleDemoUser}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
