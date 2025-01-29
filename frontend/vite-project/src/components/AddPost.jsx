import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { addPost, updatePost } from "../redux/reducers/blogReducer";
import { logout } from "../redux/reducers/authReducer";
import MainLayout from "../components/layout/MainLayout";
import ReactQuill from "react-quill";
import { CoverImageUpload } from "../components/editor/CoverImageUpload";
import { TagInput } from "../components/editor/TagInput";
import { PublishModal } from "../components/editor/PublishModal";
import 'react-quill/dist/quill.snow.css';

export default function AddPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [postId, setPostId] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [loading, setLoading] = useState(false);

  const tokens = "Bearer " + user?.token;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!user) {
    return <div>Loading user data...</div>;
  }
  if(loading) {
    return<div>Loading...</div>;
  }

  const handleSaveOrPublish = async (isPublishing = false) => {
    setLoading(true);
      if (title.trim() === "") return; // Early exit if title is empty

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", coverImage?.file); // Assuming coverImage is a file or Blob
      formData.append("tags", JSON.stringify(tags)); // Adjust based on your backend expectations

      try {
          let response;
          if (postId) {
              // Update existing post
              response = await fetch(backendUrl + `/blogs/update/${postId}`, {
                  method: "PUT",
                  headers: {
                      Authorization: tokens,
                  },
                  body: formData,
              });
          } else {
              // Save new post or publish
              response = await fetch(backendUrl + "/blogs/create", {
                  method: isPublishing ? "POST" : "POST", // Same method for both
                  headers: {
                      Authorization: tokens,
                  },
                  body: formData,
              });
          }

          if (!response.ok) {
              throw new Error(isPublishing ? "Failed to publish the post" : "Failed to save post to the backend");
          }

          const data = await response.json();
          if (postId) {
              dispatch(updatePost(data));
          } else {
              dispatch(addPost(data));
          }

          navigate("/explore"); // Navigate to the posts page after success
      } catch (error) {
          console.error("Error:", error);
      }finally{
        setLoading(false)
        setCoverImage(null);
      }
  };

  const debouncedSave = debounce(handleSaveOrPublish, 1000);

  const handleImageUpload = (file) => {
    const previewUrl = URL.createObjectURL(file);
      setCoverImage({
        preview:previewUrl,
        file:file
      });
  };

  const handleLogout = () => {
      dispatch(logout());
      navigate("/");
  };

  useEffect(() => {
      return () => {
          debouncedSave.flush();
          debouncedSave.cancel();
      };
  }, [debouncedSave]);

  return (
      <MainLayout>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-gray-800 rounded-lg p-6">
                  <CoverImageUpload
                      coverImage={coverImage}
                      onImageUpload={handleImageUpload}
                      onImageRemove={() => setCoverImage(null)}
                  />

                  <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-transparent text-3xl font-bold text-white placeholder-gray-500 border-none focus:outline-none mb-8"
                  />

                  <TagInput tags={tags} onChange={setTags} />

                  <ReactQuill theme="snow" value={content} onChange={setContent}/>

                  <div className="flex justify-between items-center mt-6">
                      <button
                          onClick={debouncedSave}
                          className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                          Save Draft
                      </button>
                      <div className="space-x-4">
                          <button className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                              Preview
                          </button>
                          <button
                              onClick={() => handleSaveOrPublish(true)} // Pass true to indicate publishing
                              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                              Publish
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          <PublishModal
              isOpen={isPublishModalOpen}
              onClose={() => setIsPublishModalOpen(false)}
              onPublish={() => handleSaveOrPublish(true)} // Pass true when closing modal for publishing
              isPublishing={isPublishing}
          />
      </MainLayout>
  );
}
