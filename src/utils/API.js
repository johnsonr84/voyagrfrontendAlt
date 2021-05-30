import axios from "axios";

export const API = {
  savePost: (post) => axios.post("https://voyagrapp.herokuapp.com/api/posts", post),

  getPost: (sub) => axios.get("https://voyagr-app.netlify.app/dashboard" + sub)
}