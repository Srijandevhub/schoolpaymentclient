# 🎓 School Payment & Dashboard Frontend (React + Bootstrap)

This is the frontend for the **School Payment and Dashboard Application**.  
It provides a user-friendly interface for viewing, filtering, and managing transactions.

---

## 🚀 Tech Stack
- **React.js**
- **React Bootstrap**
- **Axios** (API calls)
- **React Router** (URL persistence)

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Backend URL
Create `.env`:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

### 4. Run Frontend
```bash
npm start
```

---

## 📊 Features (Dashboard)

- **Transactions Overview Table**
  - Columns: `collect_id`, `school_id`, `gateway`, `order_amount`, `transaction_amount`, `status`, `custom_order_id`.
- **Filters**
  - Multi-select status filter (`Success`, `Pending`, `Failed`).
  - Multi-select school filter.
  - Date range filter (start–end).
- **Search**
  - Search by `custom_order_id`.
- **Sorting**
  - Clickable table headers for ascending/descending sorting.
- **Pagination**
  - `Prev | 1 | 2 | 3 | Next` pagination buttons.
  - Backend-driven (`page`, `limit`, `total`).
- **URL Persistence**
  - Filters, search, and pagination persist in the URL query params.
  - Supports sharable URLs (copy/paste and reload without losing filters).

---

## 🔗 Consumed APIs

### Transactions
- `GET /transactions` → Fetch paginated & filterable transactions list.  
- `GET /transactions/school/:schoolId` → Transactions for a single school.  
- `GET /transaction-status/:custom_order_id` → Get latest status of a transaction.

### Payments
- `POST /create-payment` → Trigger new payment link generation.  
- `POST /webhook` → Used internally by backend (not called from frontend).  

---

## 🧪 Usage
1. Start **backend** (`npm run dev`) and **frontend** (`npm start`).
2. Open [http://localhost:3000](http://localhost:3000).
3. Navigate to the **Dashboard**.
4. Try:
   - Searching by custom order ID.
   - Filtering by school or status.
   - Sorting columns.
   - Paginating.
   - Copying/sharing URL with filters.

---

## ✅ Edge Cases Covered
- No transactions → shows `"No transactions found"`.
- Invalid search → empty state handled.
- Sorting toggles between asc/desc.
- Filters reset properly when removed.

---

## 📌 Notes
- Works best with backend running at `http://localhost:5000`.  
- Replace `baseUrl` with deployed backend URL for production.
