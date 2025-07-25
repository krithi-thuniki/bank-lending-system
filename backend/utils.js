function calculateSimpleInterest(P, N, R) {
  return (P * N * R) / 100;
}

function calculateEMI(totalAmount, loanPeriodYears) {
  return +(totalAmount / (loanPeriodYears * 12)).toFixed(2);
}

module.exports = { calculateSimpleInterest, calculateEMI };
