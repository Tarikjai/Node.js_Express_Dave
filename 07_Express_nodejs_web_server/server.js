require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path');
const {  logger} = require('./middeleware/logEvents')
const   errorHandler = require('./middeleware/errorHandler')
const cors = require('cors')
const PORT =  process.env.PORT

// custom middlewarre

app.use(logger)

// Cross Origin Resource Sharging
const whiteList = ['https://google.com','http://127.0.0.1:5500','http://localhost:3500']

const corsOption ={
    origin :(origin, callback)=>{
        if(!origin ||  whiteList.indexOf(origin) !==-1)  {  // indexOf retourne -1 si l'origine n'est pas trouvée dans whiteList
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus:200
}


app.use(cors(corsOption))

// built-in middellware forform data
app.use(express.urlencoded({ extended: false }));

// built-in middellware for json
app.use(express.json())

// Server static files 
app.use(express.static(path.join(__dirname,'/public')))



app.get('^/$', (req,res)=>{
     res.sendFile('./views/index.html', {root : __dirname})
   // res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('/new-page(.html)?', (req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})

app.get('/old-page(.html)?', (req,res)=>{
    res.redirect(301, 'new-page.html') // 302 by default
})


// route handlers
app.get('/hello(.html)?' , (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
}, (req, res) => {
     res.send('hello World')
})


// chaining route handlers 

const one = (req, res, next) => {
    console.log('one')
    next()
}
const two = (req, res, next) => {
    console.log('two')
    next()
}
const three = (req, res) => {
    console.log('three')
    res.send('Finished')
    
}

app.get('/chain(.html)?', [one ,two , three])
 

// app.u
app.all('*', (req,res)=>{
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if  (req.accepts('json')){
        res.json(path.join({ error : '404 Not Found'}))
    } else if  (req.accepts('txt')){
        res.type.send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));