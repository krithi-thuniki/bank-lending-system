const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/:loan_id/payments', (req, res) => {
  const { loan_id } = req.params;
  const { amount, payment_type } = req.body;
  const payment_id = uuidv4();

  db.get(`SELECT * FROM Loans WHERE loan_id = ?`, [loan_id], (err, loan) => {
    if (err || !loan) return res.status(404).json({ error: 'Loan not found' });

    db.run(
      `INSERT INTO Payments (payment_id, loan_id, amount, payment_type) VALUES (?, ?, ?, ?)`,
      [payment_id, loan_id, amount, payment_type],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.all(`SELECT SUM(amount) as total_paid FROM Payments WHERE loan_id = ?`, [loan_id], (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });

          const amount_paid = parseFloat(rows[0].total_paid || 0);
          const total_amount = parseFloat(loan.total_amount);
          const monthly_emi = parseFloat(loan.monthly_emi);

          const remaining_balance = parseFloat((total_amount - amount_paid).toFixed(2));
          const emis_left = Math.ceil(remaining_balance / monthly_emi);

          return res.json({
            payment_id,
            loan_id,
            message: 'Payment recorded successfully.',
            remaining_balance,
            emis_left
          });
        });
      }
    );
  });
});

module.exports = router;
