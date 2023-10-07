const Mongoose = require("mongoose"),
{
 Schema,
 model
} = Mongoose;

const reportSchema = new Schema({
 longitude: Number,
 latitude: Number,
 image: String,
 typeOfWaste: String,
 phoneNumber: String,
 lga: String,
 area: String,
 isTreated: {
  type: Boolean,
  default: false,
 },
 treatedBy: {
  type: Mongoose.Types.ObjectId,
  ref: 'user'
 }
}, {
 timestamps: true
})

module.exports =  model("report", reportSchema)