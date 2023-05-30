const mongoose = require("mongoose")
 
const connection = mongoose.connect("mongodb+srv://saurabh:saurabh@cluster0.hovcp.mongodb.net/Air-Ticket-Booking")

module.exports={
	connection
}