import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import '../Styles/Signup.css'

const Signup = () => {
    const [data, setData] = useState({ name: '', password: '', email: '' })
    const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL

    const handleData = (e) => {

        const { name, value } = e.target;

        setData({ ...data, [name]: value })


    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(`${API_BASE_URL}/api/v1/user/signup`, data)
            console.log(response.data);
            toast.success(response.data.message)


        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className="d-flex align-items-center justify-content-center vh-100" style={{ fontFamily: "monospace" }}>
                        <div className="card signup-card shadow-lg p-4 rounded">
                            <h3 className="text-center mb-3">Sign-up</h3>

                            <form className='d-flex flex-column gap-3' onSubmit={(e) => handleSubmit(e)}>
                                <div>
                                    <label>Name:</label>
                                    <input type="text" placeholder='Enter name' name='name' value={data.name} onChange={(e) => handleData(e)} className='form-control' />
                                </div>

                                <div>
                                    <label htmlFor="">Email :</label>
                                    <input type="email" placeholder='Enter email' name='email' value={data.email} onChange={(e) => handleData(e)} className='form-control' />
                                </div>

                                <div>
                                    <label>Password:</label>
                                    <input type="password" placeholder='Enter password' name='password' value={data.password} onChange={(e) => handleData(e)} className='form-control' />
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <p className="text-primary">Already have an account?</p>
                                    <NavLink to={'/login'} className='text-decoration-none'>Login</NavLink>
                                </div>

                                <div className='text-center'>
                                    <button className='btn btn-dark px-4 fw-bold'>Signup</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Signup
