const express = require('express')
const exphbs  = require('express-handlebars');

const app = express()
const port = 3000


// Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', (req, res) => res.render('home'))


app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name;
    // render the greetings view, passing along the name
    res.render('main', { name });
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))