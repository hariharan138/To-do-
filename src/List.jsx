import React from 'react';
import './List.css';

const List = ({ list, onDelete, onEdit }) => {
  return (
    <ul className="todo-list">
      {list.map((item, index) => (
        <li key={index} className="todo-item">
          <span className="todo-text">{item}</span>
          <div className="todo-actions">
            <button onClick={() => onEdit(index)} className="action-button edit-button">
              Edit
            </button>
            <button onClick={() => onDelete(index)} className="action-button delete-button">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;

