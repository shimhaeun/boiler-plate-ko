const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://haeun:<0809>@react-blog.c4q5d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! hello'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))