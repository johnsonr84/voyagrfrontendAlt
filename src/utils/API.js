import axios from "axios";

export const API = {
  saveUser: (user) => axios.post("https://voyagrapp.herokuapp.com/api/users", user),

  getUser: (uid) => axios.get("https://voyagrapp.herokuapp.com/api/users/", uid),

  getUserByParam: (uid) => axios.get("https://voyagrapp.herokuapp.com/api/users/" + uid),

  updateUser: (uid) => axios.put("https://voyagrapp.herokuapp.com/api/users/", uid),

  savePost: (post) => axios.post("https://voyagrapp.herokuapp.com/api/posts", post),

  getPost: (uid) => axios.get("https://voyagrapp.herokuapp.com/api/posts/" + uid)
}