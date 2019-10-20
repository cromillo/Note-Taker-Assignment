const router = require("express").Router()
const fs = require("fs")


router.get("/notes",function(req,res){
    fs.readFile("db/db.json","utf8",(error,jsonString)=>{
        if (error) {
            console.log("file has error", error)
            return
        }
        res.json(JSON.parse(jsonString))
    })
})
router.post("/notes",({ body },res )=>{
    const rawData = fs.readFileSync("db/db.json")
    const parseData = JSON.parse(rawData)
    const newObject = parseData.concat(body)
    const string = JSON.stringify(newObject)
    fs.writeFile("db/db.json",string,function(error){
        if (error) {
            console.log(error)
        }
        res.json(string)
    })
})
router.delete("/notes/:title",function(req,res){
    const rawData = fs.readFileSync("db/db.json")
    const parseData = JSON.parse(rawData)
   const newData = parseData.filter(obj => {
       return obj.title !== req.params.title
   })
    fs.writeFile("db/db.json",JSON.stringify(newData),function(error){
        if (error) {
            console.log(error)
        }
        res.json(newData)
    })
})
module.exports = router