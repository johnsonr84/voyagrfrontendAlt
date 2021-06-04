import axios from "axios";

export const API = {
  saveUser: (user) => axios.post("api/users", user),

  savePost: (post) => axios.post("api/posts", post),

  getPost: (sub) => axios.get("api/dashboard/" + sub)
}