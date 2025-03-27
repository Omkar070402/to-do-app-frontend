import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([]);

    const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

    const token = localStorage.getItem("token");

    const addTask = async (newTask) => {
        console.log("Sending request to add task...");
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/task/add`,
                newTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setTask((prevTasks) => [...prevTasks, response.data.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const getTask = async () => {
        try {
            console.log("🚀 Sending request to get tasks...");
            const response = await axios.get(`${API_BASE_URL}/api/v1/task/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTask(response.data.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/v1/task/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTask((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const completeTask = async (id) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/v1/task/complete/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTask((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, completed: true } : task
                )
            );
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };

    useEffect(() => {
        getTask();
    }, []);

    return (
        <TaskContext.Provider value={{ addTask, task, setTask, getTask, deleteTask, completeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};
