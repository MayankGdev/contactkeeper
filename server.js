const express = require('express');
const connectdB = require('./config/db');
const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');
const usersRoutes = require('./routes/users');

const app = express();

app.use(express.json({extended:false}));
connectdB();


app.use(authRoutes);
app.use(contactsRoutes);
app.use(usersRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`server running on ${PORT}`));