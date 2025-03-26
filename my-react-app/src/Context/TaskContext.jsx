import React, { createContext, useContext, useState } from "react";
import axios from 'axios'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {

    const [task, setTask] = useState([])

    const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${token}` } };
    };


    const addTask = async (newTask) => {

        try {

            const response = await axios.post(`${API_BASE_URL}/api/v1/task/add`, newTask,
                getAuthHeaders()
            )
            console.log(response.data);



        } catch (error) {
            console.log(error);


        }

    }

    const getTask = async () => {

        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/task/get`, getAuthHeaders())
            setTask(response.data.data)

        } catch (error) {
            console.log(error);

        }
    }

    const deleteTask = async (id) => {
        try {

            const response = await axios.delete(`${API_BASE_URL}/api/v1/task/delete/${id}`, getAuthHeaders())
            setTask((prevTask) => prevTask.filter((task) => task._id !== id))

        } catch (error) {
            console.log('Error in deleting task', error);


        }
    }

    const completeTask = async (id) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/v1/task/complete/${id}`, getAuthHeaders());

            setTask((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, completed: true } : task
                )
            );
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };



    return (
        <TaskContext.Provider value={{ addTask, task, setTask, getTask, deleteTask, completeTask }}>{children}</TaskContext.Provider>
    )

}

export const useTasks = () => {
    return useContext(TaskContext)
}

