const app = require('./app');
const PORT = process.env.PORT || 3001;

console.log('✅ server.js is running'); // DEBUG LOG

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
