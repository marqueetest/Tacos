import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const userId = localStorage.getItem("userId");
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};

    if (!values.username) {
      error.username = "Email is required";
    }

    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if(userId){
      navigate("/");
    }

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setError("");
      axios.post(`${process.env.REACT_APP_BASE_PATH}auth/login`, user).then((res) => {
        setSuccess(res.data.msg);

        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("username", res.data.data.username);
        localStorage.setItem("tacos", res.data.data.tacos);
        localStorage.setItem("wallet", res.data.data.wallet);
        localStorage.setItem("token", res.data.token);

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }).catch((err)=> {
        setError(err.response.data.error);
      });
    }
  }, [formErrors]);
  return (
    <div className={basestyle.mainWrapper}>
    <form>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={changeHandler}
          value={user.username}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        { success ? <p className="alert-success">{success}</p> : "" }
        { error ? <p className={basestyle.error}>{error}</p> : "" }
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      Not yet registered?<NavLink to="/signup"> Register Now</NavLink>
    </div>
  );
};
export default Login;