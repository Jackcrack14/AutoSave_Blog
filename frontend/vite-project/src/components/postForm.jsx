// PostForm.js
import React from 'react';

const PostForm = ({ formData, onInputChange, onSave }) => {
  const handleInputChange = (e) => {
    onInputChange(e.target.name, e.target.value);
  };

  const handleSave = () => {
    onSave(formData);
  };

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
