import React, { useState } from 'react'
import axios from 'axios'

const Ledger = () => {
  const [loanId, setLoanId] = useState('')
  const [ledger, setLedger] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/loans/${loanId}/ledger`)
      setLedger(res.data)
    } catch (err) {
      console.error(err)
      alert('Error fetching ledger.')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Loan Ledger</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Loan ID</label>
          <input className="form-control" value={loanId} onChange={e => setLoanId(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Get Ledger</button>
      </form>

      {ledger && (
        <div className="mt-4">
          <p><strong>Customer ID:</strong> {ledger.customer_id}</p>
          <p><strong>Principal:</strong> ₹{ledger.principal}</p>
          <p><strong>Total Amount:</strong> ₹{ledger.total_amount}</p>
          <p><strong>Amount Paid:</strong> ₹{ledger.amount_paid}</p>
          <p><strong>Balance:</strong> ₹{ledger.balance_amount}</p>
          <p><strong>EMIs Left:</strong> {ledger.emis_left}</p>
          <h5 className="mt-3">Transactions:</h5>
          <ul className="list-group">
            {ledger.transactions.map(txn => (
              <li className="list-group-item" key={txn.transaction_id}>
                <strong>{txn.date}</strong>: ₹{txn.amount} ({txn.type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Ledger
