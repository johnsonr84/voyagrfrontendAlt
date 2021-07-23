import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { API } from "../../utils/API";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  function signup(name, email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        userData.user.updateProfile({ displayName: name });
        userData.user.sendEmailVerification();
        // console.log(userData.user.uid)
        // console.log(name)
        const newUser = {
          userName: name,
          profileImage: [],
          uid: userData.user.uid,
        };

        console.log(newUser);
        API.saveUser(newUser).catch((e) => console.log(e));
      })
      .catch((error) => console.log(error));
  }

  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updatePhotoURL(image) {
    return currentUser.updateProfile({ photoURL: image });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updatePhotoURL,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
