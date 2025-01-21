// App.js
import React from "react";
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
  const backendUrl = import.meta.env.VITEVITE_BACKEND_URL;
  const posts = useSelector((state) => state.blog.posts);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Fetch initial posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch(backendUrl + "/blogs/read");
        const data = await response.json();
        dispatch(setPosts(data));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);

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
            <Route path="/view/:id" element={<PostView />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};
const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth.user);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
export default App;
