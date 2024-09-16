 
const fsPromies = require('fs').promises;
const path = require('path')


const fileOps = async ()=> {
    try {
        const data = await fsPromies.readFile(path.join(__dirname, 'files','starter.txt'), "utf8")
        console.log(data);
    } catch (error) {
        console.error(err);
    }
}

fileOps();
/*

fs.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8', (err,data)=>{
    if (err) throw err;
    console.log(data.toString())
})

console.log("Hello Tarik")


fs.writeFile(path.join(__dirname, 'files','replay.txt'), 'Writing my file ',(err)=>{
    if (err) throw err;
    console.log("write complete")

    fs.appendFile(path.join(__dirname, 'files','replay.txt'), '\n\nappend my file',(err)=>{
        if (err) throw err;
        console.log("Append complete")

        fs.rename(path.join(__dirname, 'files','replay.txt'), path.join(__dirname, 'files','newReplay.txt'),(err)=>{
            if (err) throw err;
            console.log("Rename complete")
        })
    })
})
*/



process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1)
})
