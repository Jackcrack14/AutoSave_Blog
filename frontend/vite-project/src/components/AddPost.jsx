import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../redux/reducers/blogReducer';
import { useNavigate } from 'react-router-dom';
import {debounce} from 'lodash'
import PostForm from './postForm';

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [postId, setPostId] = useState(null);
  
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    debouncedSave()
  };

  const handleSave = async () => {
    if (formData.title.trim() !== '') {
      // If there is a postId, update the existing post; otherwise, add a new post
  
      let newPostId;
      if (postId) {
        await updateExistingPost(postId, formData);
        newPostId = postId; // If it's an update, use the existing postId
      } else {
        newPostId = await saveNewPost(formData);
      }
  
      // Log the updated postId
      console.log('Updated PostId:', newPostId);
  
      // Set the postId state after the value is updated
      setPostId(newPostId);
    }
  };
  

  const saveNewPost = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save post to the backend');
      }

      const data = await response.json();
      console.log('Post saved to backend:', data);

      // Dispatch the addPost action to update the Redux store
      dispatch(addPost(data));

      // Return the generated postId
      return data;
    } catch (error) {
      console.error('Error saving post to backend:', error);
      return null;
    }
  };

  const updateExistingPost = async (postId, formData) => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/update/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post to the backend');
      }

      const data = await response.json();
      console.log('Post updated to backend:', data);

      // Dispatch the updatePost action to update the Redux store
      dispatch(updatePost(data));
    } catch (error) {
      console.error('Error updating post to backend:', error);
    }
  };
  const debouncedSave = debounce(handleSave, 1000)

  useEffect(() => {
    // Clean up the debouncedSave function when the component unmounts
    
    return () => {

      debouncedSave.flush(); // Ensure any pending debounced calls are executed before unmount
      debouncedSave.cancel();
      // setPostId(null)
    };
  }, [debouncedSave]);
  
  return (
    <div className="container">
      <h1>Add New Post</h1>
      <PostForm formData={formData} onInputChange={handleInputChange} onSave={debouncedSave} />
    </div>
  );
};

export default AddPost;
