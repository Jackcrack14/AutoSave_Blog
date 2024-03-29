// PostList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../redux/reducers/blogReducer';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authReducer';

const PostList = ({ posts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const handleDelete = async (postId) => {
    console.log(postId)
    try {
      dispatch(deletePost(postId))
      const response = await fetch(`http://localhost:5000/blogs/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        }
      });
      // console.log(response)
      if (!response.ok) {
        throw new Error('Failed to delete post from the backend');
      }

      // Handle success, e.g., log the response
      const data = await response;
      console.log('Post deleted from backend:', data);
      navigate('/posts')
    } catch (error) {
      console.error('Error saving post to backend:', error);
      // Handle error, e.g., show an error message to the user
    }
  };
  const navigatePost = () => {
    navigate('/posts')
  }
  const handleEdit = async (postId) => {
    navigate(`/edit/${postId}`)
  };

  const handleView = (postId) => {
    navigate(`/view/${postId}`)
  }
  
  const handleLogout = () => {
    navigate('/login')
    dispatch(logout())
  }

  return (
    <div>
      <h2>Blog Posts</h2>
      <button onClick={navigatePost}>Posts</button>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            {/* <p>{post.content}</p> */}
            {/* {console.log(post._id)} */}
            { user._id == post.owner[0] ? <button onClick={() => handleDelete(post._id)}> Delete</button> : null}
            {/* Add an Edit button with a link to the edit route */}
            <Link to={`/edit/${post._id}`}>
            { user._id == post.owner ? <button onClick={() => handleEdit(post._id)}> Edit</button> : null}
            </Link>
            <Link to={`/view/${post._id}`}>
                <button onClick={handleView(post._id)}>view</button>
            </Link>
          </li>
        ))}
      </ul>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default PostList;
