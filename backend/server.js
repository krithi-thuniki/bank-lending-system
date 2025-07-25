const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/loans', require('./routes/loans'));
app.use('/api/v1/loans', require('./routes/payments'));
app.use('/api/v1/loans', require('./routes/ledger'));
app.use('/api/v1/customers', require('./routes/customers'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
