import React, { useContext, useState, useEffect } from "react";
import { auth, provider } from "../../firebase";
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

  async function signupWithGoogle() {
    auth
      .signInWithPopup(provider)
      .then((result) => (result.additionalUserInfo.isNewUser ? result : false))
      .then((result) => {
        if (result) {
          const newUser = {
            userName: result.user.displayName,
            profileImage: [],
            uid: result.user.uid,
          };

          console.log(newUser);
          API.saveUser(newUser);
        } else {
          console.log("I'm Sorry, I'm afraid I can't do that.");
        }
      });
  }

  function signup(name, email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => (result.additionalUserInfo.isNewUser ? result : false))
      .then((result) => {
        if (result) {
          result.user.updateProfile({ displayName: name });
          result.user.sendEmailVerification();

          const newUser = {
            userName: name,
            profileImage: [],
            uid: result.user.uid,
          };

          console.log(newUser);
          API.saveUser(newUser);
        } else {
          console.log("I'm Sorry, I'm afraid I can't do that.");
        }
      });
  }

  async function loginWithGoogle() {
    return auth.signInWithPopup(provider);
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
    signupWithGoogle,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
