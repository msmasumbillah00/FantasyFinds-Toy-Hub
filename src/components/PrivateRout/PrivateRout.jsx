import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";

const PrivateRout = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    // console.log(loading)
    const location = useLocation();
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>
};

export default PrivateRout;