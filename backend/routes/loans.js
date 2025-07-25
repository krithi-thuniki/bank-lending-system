const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res) => {
  const { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;
  const loan_id = uuidv4();

  const principal = parseFloat(loan_amount);
  const rate = parseFloat(interest_rate_yearly);
  const time = parseFloat(loan_period_years);

  const interest = (principal * rate * time) / 100;
  const total_amount = parseFloat((principal + interest).toFixed(2));
  const monthly_emi = parseFloat((total_amount / (time * 12)).toFixed(2));

  db.run(
    `INSERT INTO Loans (loan_id, customer_id, principal_amount, total_amount, interest_rate, loan_period_years, monthly_emi, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [loan_id, customer_id, principal, total_amount, rate, time, monthly_emi, 'ACTIVE'],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      return res.status(201).json({
        loan_id,
        customer_id,
        total_amount_payable: total_amount,
        monthly_emi
      });
    }
  );
});

module.exports = router;
