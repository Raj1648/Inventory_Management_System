const jwt = require('./node_modules/jsonwebtoken');

const token = jwt.sign({ id: 3, email: 'admin@example.com', role: 'admin' }, 'supersecretkey', { expiresIn: '1h' });

async function check() {
  try {
    const res = await fetch('http://localhost:5000/api/products/suggestions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2).slice(0, 1000));
  } catch (err) {
    console.log('Error:', err.message);
  }
}
check();
