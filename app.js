const express = require('express');
const exphbs = require('express-handlebars');

const checklistRoutes = require('./routes/checklistRoutes');

const app = express();
const port = 3000;

// Middleware for serving static files (like CSS, JS)
app.use(express.static('views'));

// Configure Handlebars as the template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.use('/checklist', checklistRoutes);

// Root Route
app.get('/', (req, res) => {
  res.redirect('/checklist');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
