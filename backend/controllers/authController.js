const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO customers (full_name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [full_name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists.' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Database error.' });
      }

      return res.status(201).json({ message: 'User registered successfully.' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};
