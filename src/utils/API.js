import axios from "axios";

export const API = {
  saveUser: (user) => axios.post("api/users", user),

  userExists: (sub) => axios.get("api/users" + sub),

  savePost: (post) => axios.post("api/posts", post),

  getPost: (sub) => axios.get("api/dashboard/" + sub)
}