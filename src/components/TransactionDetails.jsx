import { Button, Card, CardBody, Container } from "react-bootstrap"
import styles from "./TransactionDetails.module.css"
import { Select } from "antd"
import { useEffect, useState } from "react";
import axios from "axios";
const { Option } = Select;
import { baseUrl } from "../baseUrl";
import Header from "./Header";

const TransactionDetails = () => {
    const [selectedSchoolid, setSelectedSchoolid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${baseUrl}/transactions/school/${selectedSchoolid}`, {
                    withCredentials: true,
                    params: {
                        limit,
                        page
                    }
                });
                setTransactions(res.data.results);
                setTotal(res.data.total);
                setLimit(res.data.limit);
                setPage(res.data.page);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, [selectedSchoolid, limit, page])
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
            <Card style={{ height: '100%' }}>
                <Header />
                <CardBody>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h6 className="fw-bold m-0">Transaction Details</h6>
                        <div className={styles.filterBox}>
                            <Select value={selectedSchoolid} placeholder="Select School ID" style={{ width: '100%' }} size="medium" onChange={(val) => { val === 'null' ? setSelectedSchoolid(null) : setSelectedSchoolid(val) }}>
                            <Option value="null">Select</Option>
                                <Option value="65b0e6293e9f76a9694d84b4">65b0e6293e9f76a9694d84b4</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-4">
                        {
                            loading ? <h5 className="text-center">Loading...</h5>
                            :
                            <>
                                {
                                    transactions.length === 0 ?
                                    <h3 className="text-center">No Data Found</h3>
                                    :
                                    <>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <p className="m-0 fs-6">Entries</p>
                                        <div className={styles.entries}>
                                            <Select style={{ width: '100%' }} value={limit} onChange={(val) => setLimit(val)}>
                                                <Option value="1">1</Option>
                                                <Option value="10">10</Option>
                                                <Option value="20">20</Option>
                                                <Option value="50">50</Option>
                                                <Option value="100">100</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th>Sl No</th>
                                                    <th>Collect ID</th>
                                                    <th>Custom Order ID</th>
                                                    <th>Gateway</th>
                                                    <th>Order Amount</th>
                                                    <th>Transaction Amount</th>
                                                    <th>Status</th>
                                                    <th>Student Name</th>
                                                    <th>Student Email</th>
                                                    <th>Payment Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    transactions.map((transaction, index) => {
                                                        return (
                                                            <tr key={transaction._id}>
                                                                <td>{index + 1}</td>
                                                                <td>{transaction.collect_id}</td>
                                                                <td>{transaction.custom_order_id}</td>
                                                                <td>{transaction.gateway}</td>
                                                                <td>{transaction.order_amount}</td>
                                                                <td>{transaction.transaction_amount}</td>
                                                                <td>{transaction.status === 'success' ? <span className={styles.success}>SUCCESS</span> : <span className={styles.pending}>PENDING</span>}</td>
                                                                <td>{transaction.student_info.name}</td>
                                                                <td>{transaction.student_info.email}</td>
                                                                <td>{formatDateTime(transaction.payment_time)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
                                      {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1).map((p) => (
                                        <Button
                                          key={p}
                                          variant={p === page ? "dark" : "light"}
                                          onClick={() => setPage(p)}
                                        >
                                          {p}
                                        </Button>
                                      ))}
                                    </div>
                                    </>
                                }
                            </>
                        }
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default TransactionDetails