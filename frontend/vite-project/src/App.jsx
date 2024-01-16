// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from './redux/reducers/blogReducer';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import Home from './components/Home'
import EditPost from './components/EditPost'
import SignUp from './components/SignUp';
import Login from './components/Login';
import PostView from './components/postView';
import './App.css'; // Make sure to import your CSS file

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts);
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    // Fetch initial posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/blogs/read');
        const data = await response.json();
        dispatch(setPosts(data));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path="/posts" element={<Home posts={posts} />} />            
          <Route path="/add" element={<AddPost  />} />
          <Route path="/edit/:id" element={<EditPost  />} />
          <Route path='/view/:id' element={<PostView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
