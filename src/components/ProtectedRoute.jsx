import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({ children, isAuthpage = false }) => {
    const user = useSelector((state) => state.user);
    if (user.status === 'loading' || user.status === 'idle') {
        return <Loader height="full"/>
    }
    if (isAuthpage) {
        if (user.data && user.isAuthenticated) {
            return <Navigate to="/transaction-overview"/>
        }
        return children;
    }
    if (!user.data && !user.isAuthenticated) {
        return <Navigate to="/login"/>
    }
    return children;
}

export default ProtectedRoute
