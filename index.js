const express = require('express');
const app = express()
app.use(express.json());

const connectDB = require('./Utils/db');
const userRoute = require('./Routes/userRoute');
const LoginRoute = require('./Routes/loginRoute');

const cors = require('cors');
app.use(cors());

connectDB();

app.use('/api/users',userRoute);
app.use('/api/employee',LoginRoute);


const PORT = process.env.PORT || 3008

app.listen(PORT,()=> console.log(`Server running at ${PORT}`));
