// Express server entry point
const express = require('express');
const app = express();
app.use(express.json());
// ...add routes and middleware here...
app.get('/', (req, res) => res.send('Backend API running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
