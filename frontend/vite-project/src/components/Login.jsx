import React, { useState } from "react";
import { Github, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../redux/reducers/authReducer";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import SocialButton from "../components/auth/SocialButton";
import AuthDivider from "../components/auth/AuthDivider";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(login(data));
        const origin = location.state?.from?.pathname || "/";
        navigate(origin, { replace: true });
      } else {
        setErrorMessage(data.message || "Failed to login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
    >
      <form
        onSubmit={handleSubmit}
        className="animate-fade-up animation-delay-100"
      >
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-purple-500 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-400">Remember me</span>
          </label>
          <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 ${
            isLoading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          } text-white rounded-lg transition-colors`}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <AuthDivider />

        <div className="grid grid-cols-2 gap-4">
          <SocialButton
            icon={Github}
            label="GitHub"
            onClick={() => console.log("GitHub login")}
          />
          <SocialButton
            icon={Mail}
            label="Google"
            onClick={() => console.log("Google login")}
          />
        </div>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-400 hover:text-purple-300">
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
