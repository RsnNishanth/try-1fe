import React, { useState } from 'react';
import './SignUp.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import api from '../api';

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 chars").required(),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required(),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/newuser", data); // ✅ backend URL handled in api.js
      alert("✅ User registered successfully!");
      console.log(res);
      
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setFormError(err.response.data.error);
        console.log(formError);
        
        alert("⚠️ " + err.response.data.error);
      } else {
        setFormError("❌ Something went wrong, please try again.");
        console.log(formError);
        
        alert("❌ Something went wrong, please try again.");
      }
    }
    reset();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-container">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>

      <Card style={{ width: '25rem', padding: '1.5rem' }} className="shadow login-box">
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: '30px', color: 'white' }}>
            Register
          </Card.Title>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

            <TextField
              fullWidth label="Username" variant="outlined"
              className="white-textfield"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              fullWidth label="Password" type="password" variant="outlined"
              className="white-textfield"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="new-password"
              style={{ marginTop: '1rem' }}
            />

            <TextField
              fullWidth label="Name" variant="outlined"
              className="white-textfield"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              style={{ marginTop: '1rem' }}
            />

            <TextField
              fullWidth label="Email" type="email" variant="outlined"
              className="white-textfield"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              style={{ marginTop: '1rem' }}
            />

            <TextField
              fullWidth label="Phone Number" type="tel" variant="outlined"
              className="white-textfield"
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              style={{ marginTop: '1rem' }}
            />

            <div className="d-grid mb-3" style={{ marginTop: '1rem' }}>
              <Button type="submit" size="lg" className='lgbtn'>Register</Button>
            </div>
          </form>

          <div className="d-flex justify-content-center align-items-center">
            <Card.Text className="mb-0 me-2" style={{ color: 'white' }}>
              Registered User?
            </Card.Text>
            <Card.Link as={Link} to={'/login'}>Login</Card.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
