import { useAuth } from "../AuthContext";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../../utils/API";

const initialState = [];
const PostContext = createContext();
export const usePosts = () => useContext(PostContext);
export const PostContextProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [posts, setPosts] = useState(initialState);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    API.getPost(currentUser.uid)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [currentUser?.uid]);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};
