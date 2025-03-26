import React, { useEffect } from 'react'
import { useTasks } from '../Context/TaskContext'
import '../Styles/My_Task.css';
import { data, useNavigate } from 'react-router-dom';

const My_Task = () => {

  const { task, getTask, deleteTask, completeTask } = useTasks()
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getTask();
    }
  }, [token, navigate]);

  return (
    <div className="container mt-4">
      <h2 className="text-center task-heading mt-5">📌 My Tasks</h2>
      <div className="row">
        {task.length > 0 ? (
          task.map((t, index) => (
            <div key={index} className="col-md-4 mb-4 mt-3">
              <div className="card task-card shadow-lg p-2">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{t.task}</h5>
                  <p className="card-text">{t.description}</p>
                  <p><strong>📅 Due Date:</strong> {new Date(t.date).toLocaleDateString()}</p>
                  <p><strong>⚡ Priority:</strong> {t.priority}</p>
                  <div className="d-flex justify-content-between mt-3">
                    {!t.completed ? (
                      <>
                        <button className="btn btn-success" onClick={() => completeTask(t._id)}>
                          ✅ Complete
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => deleteTask(t._id)}>
                          ❌ Delete
                        </button>
                      </>
                    ) : (
                      <span className="badge bg-success">✔ Completed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center para text-muted fs-5">🎉 No tasks available. Start adding your tasks now!</p>
        )}
      </div>
    </div>
  )
}

export default My_Task
