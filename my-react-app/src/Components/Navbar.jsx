import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../Styles/Navbar.css'
import { useTasks } from '../Context/TaskContext'

const Navbar = () => {

    const { setTask } = useTasks()

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login");
        setTask([]);
    };

    return (
        < div >
            <nav className="navbar navbar-expand-lg bg-dark text-white p-2 shadow" id='navbar'>
                <div className="container-fluid p-2">
                    <NavLink className="navbar-brand text-white ms-3" to='/'>TO-Do-App</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 " >
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" aria-current="page" to={'/'}>Home</NavLink>
                            </li>
                            <li className="nav-item ms-5">
                                <NavLink className="nav-link text-white" to={'/mytask'}>My Task</NavLink>
                            </li>
                            <li className='nav-item ms-5'>
                                {token ? (
                                    <>
                                        <span className="me-3 text-uppercase">Hi, {userName} !</span>
                                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    </>
                                ) : (
                                    <NavLink to="/login" className="nav-link text-white">
                                        Login
                                    </NavLink>

                                )}

                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Navbar
