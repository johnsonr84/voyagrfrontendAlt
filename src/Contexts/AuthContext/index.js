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
    return auth
      .signInWithPopup(provider)
      .then((userData) => {
        // userData.user.updateProfile({ displayName: currentUser.displayName });
        // userData.user.sendEmailVerification();
        // console.log(userData.user.uid)
        // console.log(name)
        const newUser = {
          userName: userData.user.displayName,
          profileImage: [],
          uid: userData.user.uid,
        };

        console.log(newUser);
        API.saveUser(newUser).catch((e) => console.log(e));
      })
      .catch((error) => console.log(error));
  }

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
    signupWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
