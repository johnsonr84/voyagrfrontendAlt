import axios from "axios";

export const API = {
  saveUser: (user) => axios.post("api/users", user),

  userExists: (uid) => axios.get("api/users/" + uid),

  savePost: (post) => axios.post("api/posts", post),

  getPost: (uid) => axios.get("api/posts/" + uid)
}