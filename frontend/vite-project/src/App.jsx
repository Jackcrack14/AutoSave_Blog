// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "./redux/reducers/blogReducer";
import { login } from "./redux/reducers/authReducer";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import EditPost from "./components/EditPost";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PostView from "./components/postView";
import "./App.css"; // Make sure to import your CSS file
import "./index.css";
import { Explore } from "./components/Explore";

const App = () => {
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const posts = useSelector((state) => state.blog.posts);
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(login(storedUser));
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // Fetch initial posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch(backendUrl + "/blogs");
        const data = await response.json();
        console.log(data);
        dispatch(setPosts(data));
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home posts={posts} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/add" element={<AddPost />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/blogs/:id" element={<PostView />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};
const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);
  const { isAuthenticated, email } = user;
  console.log(isAuthenticated, email);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
export default App;
