import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
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
      error.username = "Username is required";
    }

    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      axios.post(`${process.env.REACT_APP_BASE_PATH}auth/signup`, user).then((res) => {
        setSuccess(res.data.msg);
        navigate("/login", { replace: true });
      }).catch((err)=> {
        setError(err.response.data.error);
      });
    }
  }, [formErrors]);
  return (
    <>
      <div className={basestyle.mainWrapper}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            onChange={changeHandler}
            value={user.username}
          />
          <p className={basestyle.error}>{formErrors.username}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={user.cpassword}
          />
          <p className={basestyle.error}>{formErrors.cpassword}</p>
          { success ? <p className="alert-success">{success}</p> : "" }
          { error ? <p className={basestyle.error}>{error}</p> : "" }
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        Already registered?<NavLink to="/login"> Login</NavLink>
      </div>
    </>
  );
};
export default Register;