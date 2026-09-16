import axios from "axios";

// The backend base URL is provided via an environment variable so that
// no hard-coded URLs/secrets live in the codebase. Configure REACT_APP_API_URL
// in a .env file (see .env.example).
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "Content-Type": "application/json" },
});

// Blogs
export const getBlogBootstrap = () => api.get("/blogs/bootstrap").then((r) => r.data);
export const getBlogCategories = () => api.get("/blogs/categories").then((r) => r.data);
export const getBlogBySlug = (slug) => api.get(`/blogs/${slug}`).then((r) => r.data);

// Comments
export const getComments = (blogId) => api.get(`/comments/${blogId}`).then((r) => r.data);
export const postComment = (blogId, payload) =>
  api.post(`/comments/${blogId}`, payload).then((r) => r.data);

// Contact / query form
export const postQuery = (payload) => api.post("/queries", payload).then((r) => r.data);

export default api;
