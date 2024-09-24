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
app.use('/', express.static(path.join(__dirname,'/public')))
app.use('/subdir', express.static(path.join(__dirname,'/public')))

// routes
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))

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