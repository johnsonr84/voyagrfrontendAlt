import axios from "axios";

export const API = {
  savePost: (post) => axios.post("/api/posts", post),

  getPost: (sub) => axios.get("/api/dashboard/" + sub)
}