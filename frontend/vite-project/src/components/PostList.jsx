// PostList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, updatePost } from '../redux/reducers/blogReducer';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  const dispatch = useDispatch();

  const handleDelete = async (postId) => {
    console.log(postId)
    try {
      dispatch(deletePost(postId))
      const response = await fetch(`http://localhost:5000/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to save post to the backend');
      }

      // Handle success, e.g., log the response
      const data = await response.json();
      console.log('Post saved to backend:', data);
    } catch (error) {
      console.error('Error saving post to backend:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  
  

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            {/* Add an Edit button with a link to the edit route */}
            <Link to={`/edit/${post._id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
