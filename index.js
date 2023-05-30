const express= require("express")
const {connection}= require("./db.js")
const {userRoute}= require("./routes/userRoutes.js")
const {  flightRoute }= require("./routes/flightroutes.js")


const app= express()
app.use(express.json())
app.use("/api",flightRoute)

app.use("/api",userRoute)

app.get("/",(req,res)=>{
	res.send("This is my Basic page")
})

app.listen(3000,async()=>{
	try{
		await connection
        console.log("Connected with Db")
	}catch(err){
		console.log("Something wrong with db")
	}
	console.log("PORT IS RUUNING AT 3000")
})

