const mongoose=require('mongoose')
exports.connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connect success")
    } catch (error) {
        console.log("error in db connect",error)
    }
}