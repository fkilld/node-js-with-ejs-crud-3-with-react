const mongoose = require('mongoose')

module.exports = async () => {
  const mongoUri =
    'mongodb+srv://azad:azad@cluster0.okzvy.mongodb.net/rud_node_express_mongodb?retryWrites=true&w=majority'

  try {
    const connect = await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB connected: ${connect.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
