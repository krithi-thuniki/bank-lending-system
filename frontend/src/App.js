import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoanForm from './components/LoanForm'
import PaymentForm from './components/PaymentForm'
import Ledger from './components/Ledger'
import AccountOverview from './components/AccountOverview'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Bank Lending System</h1>
        <nav className="mb-4">
          <Link className="btn btn-primary me-2" to="/loan">Create Loan</Link>
          <Link className="btn btn-secondary me-2" to="/payment">Make Payment</Link>
          <Link className="btn btn-info me-2" to="/ledger">Loan Ledger</Link>
          <Link className="btn btn-success" to="/overview">Customer Overview</Link>
        </nav>
        <Routes>
          <Route path="/loan" element={<LoanForm />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/overview" element={<AccountOverview />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
