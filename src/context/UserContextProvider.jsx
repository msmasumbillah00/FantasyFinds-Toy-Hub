import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import app from './../firebase/firebase.init';




export const UserContext = createContext("");


const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);



    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                fetch("http://localhost:5000/jwt", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email })
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("car-access-token", data)
                    })
            }
            else {
                setUser(null)
                localStorage.removeItem("car-access-token")

            }
            setLoading(false)
        });
        return () => {
            unsubscribe()
        };

    }, [])


    const logOut = () => {
        return signOut(auth)
    }
    const singInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const singInWithEmailPAss = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const createUserWithEmailPAss = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => alert("password reset link set to your email. Pleace check your Email to reset your Password."))
            .catch(error => {
                console.log(error)
            })

    }


    const contextInfo = {
        singInWithGoogle,
        logOut,
        singInWithEmailPAss,
        createUserWithEmailPAss,
        resetPassword,
        user,
        setUser,
        auth,
        loading,
        setLoading

    }

    return (
        <UserContext.Provider value={contextInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;