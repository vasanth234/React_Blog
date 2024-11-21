const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require('./routes/posts')
const categoryRoute=require('./routes/categories')

dotenv.config();

app.use(express.json());
//const { User} = require('./models/User');

mongoose.connect(process.env.MONGO_URL,{

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/myposts",postRoute);
app.use('/api/categories',categoryRoute)
app.listen(5020, () => {
  console.log('Backend is running on port 5020');
});

/*module.exports = {
  User
};*/