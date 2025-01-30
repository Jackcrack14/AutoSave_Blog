import React, { useState, useRef } from "react";
import { Github, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/reducers/authReducer";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import SocialButton from "../components/auth/SocialButton";
import AuthDivider from "../components/auth/AuthDivider";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setAvatar(file);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const signupData = new FormData();

        signupData.append("name", formData.name);
        signupData.append("email", formData.email);
        signupData.append("password", formData.password);
        signupData.append("avatar", avatar);

        // const { name, email, password } = formData;

        const response = await fetch(backendUrl + `/users/signup`, {
          method: "POST",
          body: signupData,
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(registerUser(data));
          navigate("/");
        } else {
          alert(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join our community of writers and readers"
    >
      <form
        onSubmit={handleSubmit}
        className="animate-fade-up animation-delay-100"
      >
        <FormInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
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
          error={errors.password}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Profile Avatar
          </label>

          <div className="flex items-center space-x-4">
            {preview ? (
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="
          py-2 
          px-4 
          bg-purple-600 
          hover:bg-purple-700 
          text-white 
          rounded-lg 
          transition-colors 
          text-sm
        "
              >
                {preview ? "Change Avatar" : "Upload Avatar"}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-purple-500 focus:ring-purple-500"
              required
            />
            <span className="ml-2 text-sm text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Create Account
        </button>

        <AuthDivider />

        <div className="grid grid-cols-2 gap-4">
          <SocialButton
            icon={Github}
            label="GitHub"
            onClick={() => console.log("GitHub signup")}
          />
          <SocialButton
            icon={Mail}
            label="Google"
            onClick={() => console.log("Google signup")}
          />
        </div>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:text-purple-300">
            Sign in
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
