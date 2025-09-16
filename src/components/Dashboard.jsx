import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, CardBody, Col, Row } from "react-bootstrap"
import { baseUrl } from "../baseUrl";
import styles from "./Dashboard.module.css"
import Header from "./Header";
import { DatePicker, Select } from "antd";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;
import dayjs from "dayjs";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState([]);
  const [schoolids, setSchoolids] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const [sortField, setSortField] = useState("payment_time");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleChangeStatus = (val) => {
    const currParams = Object.fromEntries([...searchParams]);
    if (val.length === 0) {
      currParams.status && delete currParams.status;
      setSearchParams(currParams);
      setStatus([]);
    } else {
      setSearchParams({ ...currParams, status: val.join(",") });
      setStatus(val);
    }
  }
  const handleChangeSchoolid = (val) => {
    const currParams = Object.fromEntries([...searchParams]);
    if (val.length === 0) {
      currParams.school && delete currParams.school;
      setSearchParams(currParams);
      setSchoolids([]);
    } else {
      setSearchParams({ ...currParams, school: val.join(",") });
      setSchoolids(val);
    }
  }
  const handleChangeDate = (val, start = true) => {
    if (start) {
      if (val === null) {
        const currParams = Object.fromEntries([...searchParams]);
        currParams.startDate && delete currParams.startDate;
        setSearchParams(currParams);
        setStartDate(null);
      } else {
        const currParams = Object.fromEntries([...searchParams]);
        currParams.startDate = val.toISOString();
        setSearchParams(currParams);
        setStartDate(val);
      }
    } else {
      if (val === null) {
        const currParams = Object.fromEntries([...searchParams]);
        currParams.endDate && delete currParams.endDate;
        setSearchParams(currParams);
        setEndDate(null);
      } else {
        const currParams = Object.fromEntries([...searchParams]);
        currParams.endDate = val.toISOString();
        setSearchParams(currParams);
        setEndDate(val);
      }
    }
  }
  useEffect(() => {
    const statusParam = searchParams.get("status");
    const schoolParam = searchParams.get("school");
    const sortFieldParam = searchParams.get("sort");
    const sortOrderParam = searchParams.get("order");
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    if (statusParam) setStatus(statusParam.split(","));
    if (schoolParam) setSchoolids(schoolParam.split(","));
    if (sortFieldParam) setSortField(sortFieldParam);
    if (sortOrderParam) setSortOrder(sortOrderParam);
    if (startDateParam) setStartDate(dayjs(startDateParam));
    if (endDateParam) setEndDate(dayjs(endDateParam));
  }, [])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          limit,
          sortField,
          sortOrder,
        };

        if (status.length) params.status = status.join(",");
        if (schoolids.length) params.school = schoolids.join(",");
        if (startDate) params.startDate = startDate.toISOString();
        if (endDate) params.endDate = endDate.toISOString();

        const res = await axios.get(`${baseUrl}/transactions`, {
          withCredentials: true,
          params
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
  }, [status, schoolids, limit, page, sortField, sortOrder, startDate, endDate])
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
  
  const handleSort = (field) => {
  const currParams = Object.fromEntries([...searchParams]);

  if (sortField === field) {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    currParams.sort = field;
    currParams.order = newOrder;
  } else {
    setSortField(field);
    setSortOrder("asc");
    currParams.sort = field;
    currParams.order = "asc";
  }
  setSearchParams(currParams);
};

  
  return (
    <div className="ps-3 h-100 display-window">
      <Card style={{ height: '100%' }}>
        <Header />
        <CardBody>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
              <h6 className="fw-bold m-0">Transaction Overview</h6>
          </div>
          <div className="my-2">
            <Row>
              <Col md={1} className="mt-2">
                <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: '12px' }}>Entries</span>
                    <div className="flex-grow-1">
                      <Select value={limit} onChange={(value) => setLimit(value)} style={{ width: '100%' }} >
                        <Option value="10">10</Option>
                        <Option value="20">20</Option>
                        <Option value="30">30</Option>
                      </Select>
                    </div>
                  </div>
              </Col>
              <Col md={11}>
                <Row className="justify-content-end">
                  <Col md={2} className="mt-2">
                    <Select style={{ width: '100%' }} placeholder="Status" value={status} onChange={(value) => handleChangeStatus(value)} allowClear mode="multiple">
                      <Option value="success">Success</Option>
                      <Option value="pending">Pending</Option>
                      <Option value="failed">Failed</Option>
                    </Select>
                  </Col>
                  <Col md={3} className="mt-2">
                    <Select value={schoolids} placeholder="Select School ID" style={{ width: '100%' }} size="medium" onChange={(val) => handleChangeSchoolid(val)} mode="multiple">
                      <Option value="65b0e6293e9f76a9694d84b4">65b0e6293e9f76a9694d84b4</Option>
                      <Option value="65b0e6293e9f76a9694d84b5">65b0e6293e9f76a9694d84b5</Option>
                    </Select>
                  </Col>
                  <Col md={2} className="mt-2">
                    <DatePicker style={{ width: '100%' }} onChange={(dates) => {
                      handleChangeDate(dates, true);
                    }} placeholder="Start Date" value={startDate} format="DD-MM-YYYY"/>
                  </Col>
                  <Col md={2} className="mt-2">
                    <DatePicker style={{ width: '100%' }} onChange={(dates) => {
                      handleChangeDate(dates, false);
                    }} placeholder="End Date" value={endDate} format="DD-MM-YYYY"/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {
            loading ? <h5 className="text-center">Loading...</h5>
            :
            <>
            {
              transactions.length === 0 ?
              <h3 className="text-center">No Transactions Found</h3>
              :
              <>
              <div className="tbl-rsp">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th onClick={() => handleSort("collect_id")} style={{ cursor: "pointer" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>Collect ID</span>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>
                        </svg>
                        </div>
                      </th>
                      <th>School ID</th>
                      <th>Gateway</th>
                      <th onClick={() => handleSort("order_amount")} style={{ cursor: "pointer" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>Order Amount</span>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>
                        </svg>
                        </div>
                      </th>
                      <th onClick={() => handleSort("transaction_amount")}
                      style={{ cursor: "pointer" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>Transaction Amount</span>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>
                        </svg>
                        </div>
                      </th>
                      <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>Status</span>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>
                        </svg>
                        </div>
                      </th>
                      <th onClick={() => handleSort("custom_order_id")} style={{ cursor: "pointer" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>Custom Order ID</span>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>
                        </svg>
                        </div>
                      </th>
                      <th onClick={() => handleSort("payment_time")} style={{ cursor: "pointer" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>Payment Time</span>
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>
                        </svg>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      transactions.map((transaction, index) => {
                        return (
                          <tr key={transaction._id}>
                            <td>{index + 1}</td>
                            <td>{transaction.collect_id}</td>
                            <td>{transaction.school_id}</td>
                            <td>{transaction.gateway}</td>
                            <td>{transaction.order_amount}</td>
                            <td>{transaction.transaction_amount}</td>
                            <td>{transaction.status === 'success' ? <span className={styles.success}>SUCCESS</span> : <span className={styles.pending}>PENDING</span>}</td>
                            <td>{transaction.custom_order_id}</td>
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
        </CardBody>
      </Card>
    </div>
  )
}
export default Dashboard
