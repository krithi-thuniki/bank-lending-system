const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:loan_id/ledger', (req, res) => {
  const { loan_id } = req.params;

  db.get(`SELECT * FROM Loans WHERE loan_id = ?`, [loan_id], (err, loan) => {
    if (err || !loan) return res.status(404).json({ error: 'Loan not found' });

    db.all(`SELECT * FROM Payments WHERE loan_id = ? ORDER BY payment_date`, [loan_id], (err, payments) => {
      db.all(`SELECT SUM(amount) as total_paid FROM Payments WHERE loan_id = ?`, [loan_id], (err, sums) => {
        const paid = sums[0].total_paid || 0;
        const balance = +(loan.total_amount - paid).toFixed(2);
        const emis_left = Math.ceil(balance / loan.monthly_emi);

        return res.json({
          loan_id,
          customer_id: loan.customer_id,
          principal: loan.principal_amount,
          total_amount: loan.total_amount,
          monthly_emi: loan.monthly_emi,
          amount_paid: paid,
          balance_amount: balance,
          emis_left,
          transactions: payments.map(p => ({
            transaction_id: p.payment_id,
            date: p.payment_date,
            amount: p.amount,
            type: p.payment_type
          }))
        });
      });
    });
  });
});

module.exports = router;
