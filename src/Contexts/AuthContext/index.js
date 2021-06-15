import React, { useContext, useState, useEffect } from "react"
import { auth } from "../../firebase"
import { useHistory } from "react-router-dom"
import firebase from "firebase/app"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    function signup(name, email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                userData.user.updateProfile({ displayName: name });
                userData.user.sendEmailVerification();
                auth.signOut();
            })
            .catch((error) => console.log(error));
    }

    async function login(email, password) {
        try {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    const emailVerified = firebase.auth().currentUser.emailVerified
                    // console.log(emailVerified)
                    if (!emailVerified) {
                        auth.signOut();
                        console.log("Email is not verified");
                    }

                })
        }
        catch {
            console.log("What happened?")

        }
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)

        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}