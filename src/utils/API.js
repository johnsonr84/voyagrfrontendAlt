import axios from "axios";

export const API = {
  saveUser: (user) => axios.post("api/users", user),

  getUser: (uid) => axios.get("api/users/", uid),

  getUserByName: (userName) => axios.get("api/search/" , userName),

  getUserByParam: (uid) => axios.get("api/users/" + uid),

  updateUser: (uid) => axios.put("api/users/", uid),

  savePost: (post) => axios.post("api/posts", post),

  getPost: (uid) => axios.get("api/posts/" + uid)
}