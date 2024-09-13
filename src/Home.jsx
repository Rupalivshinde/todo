import React, { useState } from 'react';
import './Home.css';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";

function Todo() {
    const [task, setTask] = useState("");
    const [data, setData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleClick = () => {
        if (editIndex !== null) {

            const updatedData = data.map((item, index) =>
                index === editIndex ? { ...item, task } : item
            );
            setData(updatedData);
            setEditIndex(null);
        } else if (task.trim()) {

            setData([...data, { task, completed: false }]);
        }
        setTask("");
    };

    const handleComplete = (index) => {
        const updatedData = data.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
        );
        setData(updatedData);
    };


    const handleRemove = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const handleEdit = (index) => {
        setTask(data[index].task);
        setEditIndex(index);
    };

    return (
        <div className="todo_container_alt">
            <h1 className="title_alt">To-Do List</h1>
            <div className="input_container_alt">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button onClick={handleClick}>
                    {editIndex !== null ? "Update" : "Add"}
                </button>
            </div>

            {data.length > 0 && (
                <div className="task_list_alt">
                    {data.map((item, index) => (
                        <div key={index} className={`task_card ${item.completed ? 'completed_alt' : ''}`}>
                            <span>{item.task}</span>
                            <div className="task_actions_alt">
                                <button onClick={() => handleComplete(index)}>
                                    <AiOutlineCheck className="icon_alt" />
                                </button>
                                <button onClick={() => handleEdit(index)}>
                                    <AiOutlineEdit className="icon_alt" />
                                </button>
                                <button onClick={() => handleRemove(index)}>
                                    <AiOutlineDelete className="icon_alt" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Todo;
