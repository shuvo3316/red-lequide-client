import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../../firebase/firebase.config";
import useAxiosPublic from "../../useAxiosPublic";


export const AuthContext=createContext()
const provider = new GoogleAuthProvider();
const auth=getAuth(app)
const Authprovide = ({children}) => {
    const [user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)
    const axiosPublic=useAxiosPublic();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth ,currentUser=>{
            setUser(currentUser);
                    console.log('current user is ',currentUser)

                        if(currentUser){
                            //get token and store client local storage
                            const userInfo={email:currentUser.email}
                            axiosPublic.post('/jwt',userInfo)
                            .then(res=>{
                                console.log(res.data.token)

                                if(res.data.token){
                                    localStorage.setItem('access-token',res.data.token);
                                }
                            
                        }
                            )
                        }

                        // if current use is null 
                        else
                        {
                            localStorage.removeItem('access-token');
                        }

                    setLoading(false)

        })
        return ()=>{
            return unsubscribe();
        }
    },[])

    const createUser=(email,password)=>{
        setLoading(true)

        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser=(email,password)=>{
        setLoading(true)

        return signInWithEmailAndPassword(auth,email,password);
    }
    const googleLogin=()=>{
        return signInWithPopup(auth,provider);
    }


    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
          
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const info={
        user,
        loading,
        createUser,
        loginUser,
        googleLogin,
        updateUserProfile,
        logOut



    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovide;