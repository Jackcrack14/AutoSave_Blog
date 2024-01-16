// PostForm.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ formData, onInputChange, onSave }) => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    onInputChange(e.target.name, e.target.value);
  };
  console.log(user)
  const handleSave = () => {
    

      onSave(formData);
      navigate('/posts')
    
  };
  console.log(user)
  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <textarea
        placeholder="Content"
        name="content"
        value={formData.content}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default PostForm;
