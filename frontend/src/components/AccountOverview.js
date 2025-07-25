import React, { useState } from 'react'
import axios from 'axios'

const AccountOverview = () => {
  const [customerId, setCustomerId] = useState('')
  const [overview, setOverview] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/customers/${customerId}/overview`)
      setOverview(res.data)
    } catch (err) {
      console.error(err)
      alert('Error fetching customer overview.')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Customer Loan Overview</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer ID</label>
          <input
            type="text"
            className="form-control"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Get Overview</button>
      </form>

      {overview && (
        <div className="mt-4">
          <h5>Total Loans: {overview.total_loans}</h5>
          {overview.loans.map((loan, index) => (
            <div key={loan.loan_id} className="card mt-3">
              <div className="card-body">
                <h6>Loan #{index + 1}</h6>
                <p><strong>Loan ID:</strong> {loan.loan_id}</p>
                <p><strong>Principal:</strong> ₹{loan.principal}</p>
                <p><strong>Total Amount:</strong> ₹{loan.total_amount}</p>
                <p><strong>Total Interest:</strong> ₹{loan.total_interest}</p>
                <p><strong>EMI Amount:</strong> ₹{loan.emi_amount}</p>
                <p><strong>Amount Paid:</strong> ₹{loan.amount_paid}</p>
                <p><strong>EMIs Left:</strong> {loan.emis_left}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AccountOverview
