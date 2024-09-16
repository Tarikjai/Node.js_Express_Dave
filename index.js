const fs =require('fs');
const path = require('path')

fs.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8', (err,data)=>{
    if (err) throw err;
    console.log(data.toString())
})

console.log("Hello Tarik")


fs.writeFile(path.join(__dirname, 'files','replay.txt'), 'Writing my file',(err)=>{
    if (err) throw err;
    console.log("write complete")
})


process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1)
})
