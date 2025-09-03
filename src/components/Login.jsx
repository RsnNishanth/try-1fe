import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Login.css";
import api from "../api";

// ✅ Yup schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  
const onSubmit = async (data) => {
  try {
    const { username, password } = data;
    const res = await api.post("/login", { username, password }, { withCredentials: true });

    console.log("Login response:", res.data);

    if (res.data.userId) {
      alert("Login successful!");
      navigate("/products");
    } else {
      setError(res.data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong");
  }
  reset();
};




  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-container">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>

      <Card style={{ width: "25rem", padding: "1.5rem" }} className="shadow login-box">
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: "30px", color: "white" }}>
            Login
          </Card.Title>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="mb-3">
              <TextField fullWidth label="Username" variant="outlined" className="white-textfield"
                {...register("username")} error={!!errors.username} helperText={errors.username?.message} />
            </div>

            <div className="mb-3">
              <TextField fullWidth label="Password" type="password" variant="outlined" className="white-textfield"
                {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
            </div>

            <div className="d-grid mb-3">
              <Button type="submit" size="lg" className="lgbtn">Login</Button>
            </div>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="d-flex justify-content-center align-items-center">
            <Card.Text className="mb-0 me-2" style={{ color: "white" }}>New User?</Card.Text>
            <Card.Link as={Link} to={"/signup"}>SignUp</Card.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
