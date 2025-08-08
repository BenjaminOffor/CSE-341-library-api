const bcrypt = require('bcryptjs'); // use bcrypt if that's what your model uses
const hash = '<PASTE_HASH_HERE>';   // example: "$2a$10$NwQ8..."

(async () => {
  const ok = await bcrypt.compare('password123', hash);
  console.log('match?', ok);
})();
