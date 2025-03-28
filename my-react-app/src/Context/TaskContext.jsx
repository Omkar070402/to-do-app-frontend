import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([]);

    const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

    // Function to get the token properly
    const getToken = () => {
        return localStorage.getItem("token");
    };

    const addTask = async (newTask) => {
        const token = getToken();
        if (!token) {
            console.error("❌ No token found. User might not be logged in.");
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/task/add`,
                newTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setTask((prevTasks) => [...prevTasks, response.data.data]);
        } catch (error) {
            console.error("Error adding task:", error.response?.data || error.message);
        }
    };

    const getTask = async () => {
        const token = getToken();
        if (!token) {
            console.error("❌ No token found. User might not be logged in.");
            return;
        }

        try {
            console.log("🚀 Sending request to get tasks...");
            const response = await axios.get(`${API_BASE_URL}/api/v1/task/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setTask(response.data.data);
        } catch (error) {
            console.error("❌ Error fetching tasks:", error.response?.data || error.message);
        }
    };

    const deleteTask = async (id) => {
        const token = getToken();
        if (!token) {
            console.error("❌ No token found. User might not be logged in.");
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/api/v1/task/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTask((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("❌ Error deleting task:", error.response?.data || error.message);
        }
    };

    const completeTask = async (id) => {
        const token = getToken();
        if (!token) {
            console.error("❌ No token found. User might not be logged in.");
            return;
        }

        try {
            await axios.put(
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
            console.error("❌ Error completing task:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getTask();
    }, []); // No token parameter needed, getTask() fetches it internally.

    return (
        <TaskContext.Provider value={{ addTask, task, setTask, getTask, deleteTask, completeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};
