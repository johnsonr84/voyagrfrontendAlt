import { useAuth0 } from "@auth0/auth0-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../../utils/API";

const initialState = []
const PostContext = createContext()
export const usePosts = () => useContext(PostContext)
export const PostContextProvider = ({ children }) => {
    const { user } = useAuth0();

    const [posts, setPosts] = useState(initialState)

    useEffect(() => {
        if (!user) {
            return
        }

        API.getPost(user.sub)
            .then(res =>
                setPosts(res.data)
            )
            .catch(err => console.log(err));
    }, [user?.sub]);

    return (
        <PostContext.Provider value={[posts, setPosts]}>
            {children}
        </PostContext.Provider>
    )
}