const db = require('../config/db');

// exports.searchBooks = (req, res) => {
//   const {
//     title,
//     author,
//     language,
//     published_year,
//     category_id,
//     condition,
//     rating_min,
//     rating_max,
//     price_min,
//     price_max,
//   } = req.query;

//   let sql = 'SELECT * FROM books WHERE 1=1';
//   const values = [];

//   if (title && title.trim() !== '') {
//     sql += ' AND title LIKE ?';
//     values.push(`%${title}%`);
//   }

//   if (author && author.trim() !== '') {
//     sql += ' AND author LIKE ?';
//     values.push(`%${author}%`);
//   }

//   if (language && language.trim() !== '') {
//     sql += ' AND language = ?';
//     values.push(language);
//   }

//   if (published_year && published_year.trim() !== '') {
//     sql += ' AND published_year = ?';
//     values.push(parseInt(published_year, 10));
//   }

//   if (category_id && category_id.trim() !== '') {
//     sql += ' AND category_id = ?';
//     values.push(parseInt(category_id, 10));
//   }

//   if (condition && condition.trim() !== '') {
//     sql += ' AND `condition` = ?';
//     values.push(condition);
//   }

//   if (rating_min && rating_min.trim() !== '') {
//     sql += ' AND rating >= ?';
//     values.push(parseFloat(rating_min));
//   }

//   if (rating_max && rating_max.trim() !== '') {
//     sql += ' AND rating <= ?';
//     values.push(parseFloat(rating_max));
//   }

//   if (price_min && price_min.trim() !== '') {
//     sql += ' AND price >= ?';
//     values.push(parseFloat(price_min));
//   }

//   if (price_max && price_max.trim() !== '') {
//     sql += ' AND price <= ?';
//     values.push(parseFloat(price_max));
//   }

//   console.log('SQL Query:', sql);
//   console.log('Values:', values);

//   db.query(sql, values, (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ message: 'Database error' });
//     }
//     res.json(results);
//   });
// };

exports.searchBooks = (req, res) => {
  const {
    title,
    author,
    language,
    published_year,
    category_id,
    condition,
    rating_min,
    rating_max,
    price_min,
    price_max,
  } = req.query;

  const ratingMin = parseFloat(rating_min);
  const ratingMax = parseFloat(rating_max);
  const priceMin = parseFloat(price_min);
  const priceMax = parseFloat(price_max);
  const pubYear = parseInt(published_year);
  const categoryId = parseInt(category_id);

  let sql = `SELECT * FROM books WHERE 1=1`;
  const values = [];

  if (title) {
    sql += ` AND title LIKE ?`;
    values.push(`%${title}%`);
  }

  if (author) {
    sql += ` AND author LIKE ?`;
    values.push(`%${author}%`);
  }

  if (language) {
    sql += ` AND language = ?`;
    values.push(language);
  }

  if (!isNaN(pubYear)) {
    sql += ` AND published_year = ?`;
    values.push(pubYear);
  }

  if (!isNaN(categoryId)) {
    sql += ` AND category_id = ?`;
    values.push(categoryId);
  }

  if (condition) {
    sql += ` AND \`condition\` = ?`;
    values.push(condition);
  }

  if (!isNaN(ratingMin)) {
    sql += ` AND rating >= ?`;
    values.push(ratingMin);
  }

  if (!isNaN(ratingMax)) {
    sql += ` AND rating <= ?`;
    values.push(ratingMax);
  }

  if (!isNaN(priceMin)) {
    sql += ` AND price >= ?`;
    values.push(priceMin);
  }

  if (!isNaN(priceMax)) {
    sql += ` AND price <= ?`;
    values.push(priceMax);
  }

  console.log("SQL Query:", sql);
  console.log("Values:", values);

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
};

