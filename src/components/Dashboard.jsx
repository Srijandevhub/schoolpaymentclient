import { Container, Button, Form } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [schoolFilter, setSchoolFilter] = useState([]);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const location = useLocation();
  const navigate = useNavigate();

  // Load filters from URL query params on mount
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   if (params.get("page")) setPage(Number(params.get("page")));
  //   if (params.get("limit")) setLimit(Number(params.get("limit")));
  //   if (params.get("search")) setSearch(params.get("search"));
  //   if (params.get("status")) setStatusFilter(params.get("status").split(","));
  //   if (params.get("school")) setSchoolFilter(params.get("school").split(","));
  //   if (params.get("sortField")) setSortField(params.get("sortField"));
  //   if (params.get("sortOrder")) setSortOrder(params.get("sortOrder"));
  // }, [location.search]);

  // // Fetch transactions
  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const query = new URLSearchParams({
  //         page,
  //         limit,
  //         search,
  //         status: statusFilter.join(","),
  //         school: schoolFilter.join(","),
  //         sortField,
  //         sortOrder,
  //       });

  //       const res = await axios.get(`${baseUrl}/transactions?${query.toString()}`, {
  //         withCredentials: true,
  //       });

  //       setTransactions(res.data.results);
  //       setTotal(res.data.total);

  //       // Update URL params
  //       navigate(`?${query.toString()}`, { replace: true });
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //     }
  //   };

  //   fetchTransactions();
  // }, [page, limit, search, statusFilter, schoolFilter, sortField, sortOrder, navigate]);

  // // Toggle sorting when clicking on column header
  // const handleSort = (field) => {
  //   if (sortField === field) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortOrder("asc");
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h4 text-dark fw-bold mb-0">Transactions Overview</h1>

          <div className="d-flex gap-2">
            {/* Search */}
            <Form.Control
              type="text"
              placeholder="Search (Order ID...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "250px" }}
            />

            {/* Status filter */}
            <Form.Select
              multiple
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
              style={{ maxWidth: "200px" }}
            >
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </Form.Select>

            {/* School filter (dummy school ids) */}
            <Form.Select
              multiple
              value={schoolFilter}
              onChange={(e) =>
                setSchoolFilter(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
              style={{ maxWidth: "200px" }}
            >
              <option value="65b0e6293e9f76a9694d84b4">School A</option>
              <option value="65b0e6293e9f76a9694d84b5">School B</option>
            </Form.Select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table mt-4 table-striped">
            <thead>
              <tr>
                <th>Sl No</th>
                <th onClick={() => handleSort("collect_id")} style={{ cursor: "pointer" }}>
                  Collect ID {sortField === "collect_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("school_id")} style={{ cursor: "pointer" }}>
                  School ID {sortField === "school_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("gateway")} style={{ cursor: "pointer" }}>
                  Gateway {sortField === "gateway" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("order_amount")} style={{ cursor: "pointer" }}>
                  Order Amount {sortField === "order_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th
                  onClick={() => handleSort("transaction_amount")}
                  style={{ cursor: "pointer" }}
                >
                  Transaction Amount{" "}
                  {sortField === "transaction_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status {sortField === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("custom_order_id")} style={{ cursor: "pointer" }}>
                  Custom Order ID{" "}
                  {sortField === "custom_order_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{transaction.collect_id}</td>
                    <td>{transaction.school_id}</td>
                    <td>{transaction.gateway}</td>
                    <td>{transaction.order_amount}</td>
                    <td>{transaction.transaction_amount}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.custom_order_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination with page numbers */}
<div className="d-flex justify-content-center align-items-center mt-3 gap-2">
  <Button
    variant="secondary"
    disabled={page <= 1}
    onClick={() => setPage((p) => Math.max(p - 1, 1))}
  >
    Prev
  </Button>

  {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1).map((p) => (
    <Button
      key={p}
      variant={p === page ? "primary" : "light"}
      onClick={() => setPage(p)}
    >
      {p}
    </Button>
  ))}

  <Button
    variant="secondary"
    disabled={page >= Math.ceil(total / limit)}
    onClick={() => setPage((p) => p + 1)}
  >
    Next
  </Button>
</div>
      </Container>
    </div>
  );
};

export default Dashboard;