import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const HomePage = () => {
    const user = useSelector((state) => state.user);
    if (user.data === null && !user.isAuthenticated) {
        return <Navigate to="/login"/>
    }
    return <Navigate to="/dashboard"/>
}

export default HomePage