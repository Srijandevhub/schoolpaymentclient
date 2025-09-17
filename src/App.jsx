import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./utils/userSlice"
import ProtectedRoute from "./components/ProtectedRoute"
import TransactionDetailsPage from "./pages/TransactionDetailsPage"
import TransactionStatusCheckPage from "./pages/TransactionStatusCheckPage"
import { ConfigProvider, theme } from "antd"
import { syncTheme } from "./utils/themeSlice"

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch, location.pathname])
    useEffect(() => {
        dispatch(syncTheme());
    }, [])
    const mode = useSelector((state) => state.theme.mode);
    useEffect(() => {
        document.body.setAttribute("data-bs-theme", mode);
    }, [mode])
    return (
        <ConfigProvider
            theme={{
                algorithm:
                mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<ProtectedRoute isAuthpage={true}><LoginPage /></ProtectedRoute>}/>
                <Route path="/transaction-overview" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
                <Route path="/transaction-details" element={<ProtectedRoute><TransactionDetailsPage /></ProtectedRoute>}/>
                <Route path="/transaction-status-check" element={<ProtectedRoute><TransactionStatusCheckPage /></ProtectedRoute>}/>
            </Routes>
        </ConfigProvider>
    )
}

export default App
