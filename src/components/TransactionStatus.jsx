import { Card, CardBody } from "react-bootstrap"
import Header from "./Header"
import { Input } from "antd"
import axios from "axios"
import { useState } from "react"
import { baseUrl } from "../baseUrl"
import styles from './TransactionStatus.module.css'
import { useSelector } from "react-redux"

const TransactionStatus = () => {
    const [id, setId] = useState("");
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const mode = useSelector((state) => state.theme.mode);
    const handleFetchStatus = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${baseUrl}/transaction-status/${id}`, {
                withCredentials: true
            });
            setDetails(res.data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    function formatDateTime(isoString) {
        const date = new Date(isoString);

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        };

        return date.toLocaleString("en-IN", options);
    }
    return (
        <div className="ps-3 h-100 display-window">
            <Card style={{ width: "100%" }}>
                <Header />
                <CardBody>
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                        <h6 className="fw-bold m-0">Transaction Status Check</h6>
                        <div className="d-flex align-items-center gap-1">
                            <Input size="medium" placeholder="Custom Order ID" type="text" value={id} onChange={(e) => setId(e.target.value)}/>
                            <button className={`btn ${mode === 'light' ? 'btn-dark' : 'btn-light'} btn-sm`} onClick={() => handleFetchStatus()}>Check</button>
                        </div>
                    </div>
                    {
                        loading ?  <h5 className="text-center mt-5">Loading...</h5>
                        :
                        <>
                        {
                            (details && id.length > 0) ?
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Collect ID</th>
                                        <th>Status</th>
                                        <th>Transaction Amount</th>
                                        <th>Gateway</th>
                                        <th>Last Checked At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{details.collect_id}</td>
                                        <td>{details.status === 'success' ? <span className={styles.success}>SUCCESS</span> : <span className={styles.pending}>PENDING</span>}</td>
                                        <td>{details.transaction_amount}</td>
                                        <td>{details.gateway}</td>
                                        <td>{formatDateTime(details.last_checked_at)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            :
                            <h3 className="text-center mt-5">No Data Found</h3>
                        }
                        </>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default TransactionStatus