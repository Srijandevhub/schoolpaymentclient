import { Card, CardBody, Col, Container, Row } from "react-bootstrap"
import styles from './Login.module.css'
import { useState } from "react"
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("srijan@gmail.com");
    const [password, setPassword] = useState("Asdfrom@3");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/auth/login`, {
                email,
                password
            }, { withCredentials: true });
            if (res.data.ok) {
                navigate("/transaction-overview");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Container>
            <Row className="vh-100 align-items-center justify-content-center">
                <Col md={6} lg={5} xl={5}>
                    <Card className="shadow border-0">
                        <CardBody>
                            <h1 className="h3 mb-4">Login</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className={`mb-2 ${styles.passwordWrapper}`}>
                                    <input type={showPassword ? "text" : 'password'} className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    <button className={styles.passwordToogler} aria-label="password toogler" onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword((prev) => !prev)
                                    }}>
                                        {
                                            showPassword ?
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                            :
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                        }
                                    </button>
                                </div>
                                <button className="btn btn-primary w-100">Submit</button>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Login
