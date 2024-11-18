const express = require('express');
const cors = require('cors');
const app = express();

// Tambahkan middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL frontend Anda
  credentials: true
}));

// ... kode lainnya ... 