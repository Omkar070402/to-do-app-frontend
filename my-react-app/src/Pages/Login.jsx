import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/Login.css'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const nav = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL
  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })

  }

  const handleSubmit = async (e) => {
    try {

      e.preventDefault()

      const response = await axios.post(`${API_BASE_URL}/api/v1/user/login`, data)
      console.log(response.data);
      toast.success(response.data.message)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem("userName", response.data.user.name);
      nav('/')

    } catch (error) {
      toast.error(error.message)
      console.log(error.message);

    }
  }



  return (



    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="container">

            <div className="d-flex align-items-center justify-content-center vh-100 " style={{ fontFamily: "monospace" }}>
              <div className="card login-card shadow-lg p-4 rounded">
                <h3 className="text-center mb-3">Login</h3>

                <div className="card-body">

                  <form className='d-flex flex-column gap-3' onSubmit={(e) => handleSubmit(e)} >
                    <div>
                      <label>Email:</label>
                      <input type="email" placeholder='Enter email' name='email' value={data.email} onChange={(e) => handleData(e)} className='form-control' />
                    </div>

                    <div>
                      <label>Password:</label>
                      <input type="password" placeholder='Enter password' name='password' value={data.password} onChange={(e) => handleData(e)} className='form-control' />
                    </div>
                    <div className='d-flex justify-content-around gap-5'>
                      <p className="text-primary login-para">Forgot Password?</p>
                      <p className="text-primary login-para">Don't have an account? <NavLink to={'/signup'} className='text-decoration-none'>Signup</NavLink></p>
                    </div>

                    <div className='text-center'>
                      <button className='btn btn-dark px-4 fw-bold'>Login</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
