import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthpage = false }) => {
    const user = useSelector((state) => state.user);
    if (user.status === 'loading' || user.status === 'idle') {
        return <h1>Loading...</h1>
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