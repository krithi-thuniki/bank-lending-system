# 💰 Bank Lending System

A full-stack web application for managing customer loans, making EMI/lump sum payments, and viewing detailed loan ledgers and account overviews.
NOTE :RUN BOTH THE SERVERS OF REACT AND NODE JS AT A TIME FOR THE APPLICATION WORKING.RUN REACT BY USING:npm start,RUN NODE BY USING:node server.js
## 🌐 Tech Stack

- **Frontend:** React.js + Bootstrap
- **Backend:** Node.js + Express.js
- **Database:** SQLite3

---

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v14+)
- Git
- Code Editor (VS Code)

---

### ⚙️ Backend Setup

```bash
cd backend
npm install
node server.js

💻 Frontend Setup
cd frontend
npm install
npm start
🧠 Features
1️⃣ Loan Creation
Input: Customer ID, Loan Amount, Loan Period (Years), Yearly Interest Rate

Output: Loan ID, Total Payable (Simple Interest), Monthly EMI

2️⃣ Payment Entry
Input: Loan ID, Amount, Payment Type (EMI or Lump Sum)

Output: Remaining Balance & EMIs Left

3️⃣ View Loan Ledger
View all transactions and current status of the loan using Loan ID

📝 Example
Loan:

Amount: ₹200000

Period: 2 years

Interest: 1% yearly
→ Total Payable: ₹204000
→ EMI: ₹8500

Payment:

Type: Lump Sum ₹3000
→ Balance: ₹201000
→ EMIs Left: 24

📦 Database Tables
Loans Table
loan_id (UUID)
customer_id
principal_amount
interest_rate_yearly
loan_period_years
total_amount
monthly_emi
Payments Table
payment_id (UUID)
loan_id
amount
payment_type (EMI/Lump Sum)
payment_date (IST timestamp)

📌 Future Scope
JWT Authentication
Admin Dashboard
PDF Ledger Export
Notification System
