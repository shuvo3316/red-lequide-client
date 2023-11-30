import { useContext } from "react";
import { AuthContext } from "./AuthProvider/Authprovide";

const useAuth = () => {
    const useAuth=useContext(AuthContext);

    return useAuth;
};

export default useAuth;