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

const sampleArticles = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt:
      "Exploring the latest trends and technologies shaping the web development landscape in 2024 and beyond.",
      content:"Exploring the latest trends and technologies shaping the web development landscape in 2024 and beyond.Lorem ipsum odor amet, consectetuer adipiscing elit. Curabitur ad vitae libero cras efficitur rhoncus curabitur sapien cursus. Tempus dui ultricies dolor pellentesque himenaeos gravida. Dolor eu varius integer tempus gravida luctus. Natoque eros augue suspendisse aenean malesuada maecenas. Molestie viverra sem neque nostra vulputate ac. Potenti suspendisse nam egestas ac nam diam. Sagittis adipiscing laoreet et taciti penatibus pulvinar",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read",
    comments: 12,
    date: "Mar 15, 2024",
  },
  {
    id: 2,
    title: "Mastering TypeScript in 2024",
    excerpt:
      "Essential tips and tricks for becoming a TypeScript expert and writing better code.",
      content:"Essential tips and tricks for becoming a TypeScript expert and writing better code.Lorem ipsum odor amet, consectetuer adipiscing elit. Curabitur ad vitae libero cras efficitur rhoncus curabitur sapien cursus. Tempus dui ultricies dolor pellentesque himenaeos gravida. Dolor eu varius integer tempus gravida luctus. Natoque eros augue suspendisse aenean malesuada maecenas. Molestie viverra sem neque nostra vulputate ac. Potenti suspendisse nam egestas ac nam diam. Sagittis adipiscing laoreet et taciti penatibus pulvinar",
    author: {
      name: "Michael Ross",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    readTime: "7 min read",
    comments: 8,
    date: "Mar 14, 2024",
  },
  {
    id: 3,
    title: "Design Systems in Practice",
    excerpt:
      "Building scalable and maintainable design systems for modern applications.",
      content:"Building scalable and maintainable design systems for modern applicationsLorem ipsum odor amet, consectetuer adipiscing elit. Curabitur ad vitae libero cras efficitur rhoncus curabitur sapien cursus. Tempus dui ultricies dolor pellentesque himenaeos gravida. Dolor eu varius integer tempus gravida luctus. Natoque eros augue suspendisse aenean malesuada maecenas. Molestie viverra sem neque nostra vulputate ac. Potenti suspendisse nam egestas ac nam diam. Sagittis adipiscing laoreet et taciti penatibus pulvinar",
    author: {
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    readTime: "6 min read",
    comments: 15,
    date: "Mar 13, 2024",
  },
];

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
        console.log(data, )
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
