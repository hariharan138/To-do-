import React, { useState, useEffect } from 'react';
import List from './List';
import './AddCompo.css';

const AddCompo = () => {
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('list')) || [];
    setList(savedList);
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleData = (e) => {
    setData(e.target.value);
  };

  const handleList = () => {
    if (data.trim()) {
      if (editIndex !== null) {
        const updatedList = [...list];
        updatedList[editIndex] = data;
        setList(updatedList);
        setEditIndex(null);
      } else {
        setList((prevState) => [...prevState, data]);
      }
      setData('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setData(list[index]);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setData('');
  };

  const handleDelete = (index) => {
    const updatedList = list.filter((_, idx) => idx !== index);
    setList(updatedList);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={data}
          onChange={handleData}
          placeholder={editIndex !== null ? 'Edit item' : 'Enter item'}
          className="todo-input"
        />
        <button onClick={handleList} className="todo-button">
          {editIndex !== null ? 'Save' : 'Add'}
        </button>
      </div>
      {editIndex !== null && (
        <button onClick={cancelEdit} className="todo-button cancel-button">
          Cancel
        </button>
      )}
      <div className="list-wrapper">
        {list.length === 0 ? (
          <p className="empty-list-message">Your todo list is empty. Add some tasks!</p>
        ) : (
          <List list={list} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default AddCompo;

