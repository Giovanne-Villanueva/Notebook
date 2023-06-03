const express = require('express');
const path = require('path')
const api = require('./routes/index.js')

//Port we are hosting the web page one 3001 on local device
//else its whatever is chosen by heruko 
const PORT = process.env.PORT || 3001;

const app = express();

//middleware for our project
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'))



// GET Route for Notes HTML
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Here we are listening to requests made by user
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
