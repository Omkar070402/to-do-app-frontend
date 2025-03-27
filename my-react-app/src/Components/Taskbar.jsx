import React, { useState } from 'react'
import '../Styles/Taskbar.css'
import { useTasks } from '../Context/TaskContext'
import { useNavigate } from 'react-router-dom'
const Taskbar = () => {

    const { addTask } = useTasks()
     const nav = useNavigate()
    const [data, setData] = useState({ task: '', description: '', date: '', priority: '' })

    const handleData = (e) => {

        const { name, value } = e.target;
        setData({ ...data, [name]: value })


    }

    const handleSubmit = (e) => {

        e.preventDefault();
        addTask(data)
        setData({ task: '', description: '', date: '', priority: '' })
        nav('/mytask')
    }

    




    return (
        <div>

            <div className="row mt-5 mb-5">
                <div className="col-md-12">
                    <div className="container shadow p-5 rounded task-form" >
                        <form action="" id='taskbar' onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <h3 className='text-center'>Plan your Task</h3>
                            </div>
                            <div>
                                <input type="text" placeholder='add task' name='task' onChange={(e) => handleData(e)} className='form-control ' />
                            </div>
                            <div>
                                <input type="text" placeholder='description' name='description' onChange={(e) => handleData(e)} className='form-control' />
                            </div>
                            <div>
                                <input type="date" placeholder='Due Date' name='date' onChange={(e) => handleData(e)} className='form-control' />
                            </div>
                            <div>
                                <label htmlFor="">Priority</label>
                                <select name="priority" id="" onChange={(e) => handleData(e)} className='form-control mt-3'>
                                    <option value="">Select</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div className='text-center'>
                                <button className='btn btn-outline-dark px-4 '>Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Taskbar
