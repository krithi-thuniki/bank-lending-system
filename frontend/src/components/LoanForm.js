import React, { useState } from 'react'
import axios from 'axios'

const LoanForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    loan_amount: '',
    loan_period_years: '',
    interest_rate_yearly: ''
  })
  const [response, setResponse] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/v1/loans', formData)
      setResponse(res.data)
    } catch (err) {
      console.error(err)
      alert('Error creating loan.')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Create Loan</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer ID</label>
          <input className="form-control" name="customer_id" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Loan Amount</label>
          <input type="number" className="form-control" name="loan_amount" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Loan Period (Years)</label>
          <input type="number" className="form-control" name="loan_period_years" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Interest Rate (Yearly)</label>
          <input type="number" className="form-control" name="interest_rate_yearly" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>

      {response && (
        <div className="alert alert-success mt-4">
          <h5>Loan Created:</h5>
          <p><strong>Loan ID:</strong> {response.loan_id}</p>
          <p><strong>Monthly EMI:</strong> ₹{response.monthly_emi}</p>
          <p><strong>Total Payable:</strong> ₹{response.total_amount_payable}</p>
        </div>
      )}
    </div>
  )
}

export default LoanForm
