const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:customer_id/overview', (req, res) => {
  const { customer_id } = req.params;

  db.all(`SELECT * FROM Loans WHERE customer_id = ?`, [customer_id], async (err, loans) => {
    if (err || loans.length === 0) return res.status(404).json({ error: 'No loans found for this customer' });

    let result = [];
    let total_loans = loans.length;

    for (const loan of loans) {
      const payments = await new Promise((resolve) =>
        db.all(`SELECT SUM(amount) as paid FROM Payments WHERE loan_id = ?`, [loan.loan_id], (_, rows) => resolve(rows))
      );

      const amount_paid = payments[0].paid || 0;
      const emis_left = Math.ceil((loan.total_amount - amount_paid) / loan.monthly_emi);

      result.push({
        loan_id: loan.loan_id,
        principal: loan.principal_amount,
        total_amount: loan.total_amount,
        total_interest: loan.total_amount - loan.principal_amount,
        emi_amount: loan.monthly_emi,
        amount_paid,
        emis_left
      });
    }

    return res.json({ customer_id, total_loans, loans: result });
  });
});

module.exports = router;
