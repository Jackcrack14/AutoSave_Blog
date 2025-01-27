import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { addPost, updatePost } from "../redux/reducers/blogReducer";
import { logout } from "../redux/reducers/authReducer";
import MainLayout from "../components/layout/MainLayout";
import { EditorToolbar } from "../components/editor/EditorToolbar";
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

  const tokens = "Bearer " + user?.token;

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const saveNewPost = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/blogs/create", {
        method: "POST",
        headers: {
          Authorization: tokens,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save post to the backend");
      }

      const data = await response.json();
      dispatch(addPost(data));
      return data.id;
    } catch (error) {
      console.error("Error saving post to backend:", error);
      return null;
    }
  };

  const updateExistingPost = async (postId, formData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/blogs/update/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: tokens,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post to the backend");
      }

      const data = await response.json();
      dispatch(updatePost(data));
      navigate("/posts");
    } catch (error) {
      console.error("Error updating post to backend:", error);
    }
  };
  const handleSave = async () => {
    if (title.trim() !== "") {
      let newPostId;
      if (postId) {
        await updateExistingPost(postId, { title, content, coverImage, tags });
        newPostId = postId;
      } else {
        newPostId = await saveNewPost({ title, content, coverImage, tags });
      }

      setPostId(newPostId);
    }
  };

  // Handle debounced save
  const debouncedSave = debounce(handleSave, 1000);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    const data = new FormData();
    formData.append("image",coverImage);
    formData.append("content",content);
    formData.append("title",title);
    formData.append("tags",tags);

    const response = await fetch()
    setIsPublishing(false);
    setIsPublishModalOpen(false);
    navigate("/posts"); // Navigate to the published post
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ],
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
                onClick={() => setIsPublishModalOpen(true)}
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
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />
    </MainLayout>
  );
}
