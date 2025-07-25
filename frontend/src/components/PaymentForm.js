import React, { useState } from 'react'
import axios from 'axios'

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    loan_id: '',
    amount: '',
    payment_type: 'EMI'
  })
  const [response, setResponse] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/loans/${formData.loan_id}/payments`,
        {
          amount: formData.amount,
          payment_type: formData.payment_type
        }
      )
      setResponse(res.data)
    } catch (err) {
      console.error(err)
      alert('Error making payment.')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Make a Payment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Loan ID</label>
          <input className="form-control" name="loan_id" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Amount</label>
          <input type="number" className="form-control" name="amount" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Payment Type</label>
          <select className="form-control" name="payment_type" onChange={handleChange}>
            <option value="EMI">EMI</option>
            <option value="LUMP_SUM">Lump Sum</option>
          </select>
        </div>
        <button className="btn btn-success" type="submit">Pay</button>
      </form>

      {response && (
        <div className="alert alert-info mt-4">
          <p><strong>Payment ID:</strong> {response.payment_id}</p>
          <p><strong>Remaining Balance:</strong> ₹{response.remaining_balance}</p>
          <p><strong>EMIs Left:</strong> {response.emis_left}</p>
        </div>
      )}
    </div>
  )
}

export default PaymentForm
