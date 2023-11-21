// Import the necessary dependencies
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../redux/reducers/blogReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import PostForm from './PostForm';

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const posts = useSelector((state) => state.blog.posts);
  const post = posts.find((p) => p._id === id);
  const [formData, setFormData] = useState(post);
  console.log(post)
  console.log(formData)
  const handleSave = async (formData) => {
    console.log('Handle Save:', formData);
    try {
      const response = await fetch(`http://localhost:5000/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update post to the backend');
      }

      const data = await response.json();
      console.log('Response:', data);

      // Handle success, e.g., update state or navigate to a different page
      dispatch(updatePost(data));
      
    } catch (error) {
      console.error('Error updating post to backend:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const debouncedSave = debounce((data) => handleSave(data), 1000);

  const handleInputChange = (name, value) => {
    // Update the state when input changes
    console.log('Updated formData:', { ...formData, [name]: value });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    debouncedSave(formData); // Trigger debounced save with the current form data
  };

  useEffect(() => {
    // Clean up the debouncedSave function when the component unmounts
    return () => {
      debouncedSave.flush(); // Ensure any pending debounced calls are executed before unmount
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <PostForm formData={formData} onInputChange={handleInputChange} onSave={debouncedSave} />
    </div>
  );
};

export default EditPost;
