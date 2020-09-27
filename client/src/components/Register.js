import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    second_name: "",
    phone: "",
    address: "",
  });

  const { name, email, password, second_name, phone, address} = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { name, email, password, second_name, phone, address};

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form className="ml-5 mr-5" onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="second_name"
          placeholder="second_name"
          className="form-control my-3"
          value={second_name}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          className="form-control my-3"
          value={phone}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="address"
          placeholder="address"
          className="form-control my-3"
          value={address}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link className="ml-5" to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;
