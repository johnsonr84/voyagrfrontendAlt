import axios from "axios";

export const API = {
  saveUser: (user) => axios.post("api/users", user),

  // userExists: (user) => axios.post("api/users", user),

  savePost: (post) => axios.post("api/posts", post),

  getPost: (uid) => axios.get("api/posts/" + uid)
}