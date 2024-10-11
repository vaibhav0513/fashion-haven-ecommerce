import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: {type: String, reuired: true},
  items: {type: Array, reuired: true},
  amount: {type: Number, reuired: true},
  address: {type: Object, reuired: true},
  status: {type: String, reuired: true,default: 'order placed'},
  paymentMethod: {type: String, reuired: true},
  payment: {type: Boolean, reuired: true, default: false},
  date: {type: Number, reuired: true}
})


const orderModel = mongoose.models.order || mongoose.model('order' , orderSchema)
export default orderModel;