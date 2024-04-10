require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const listings = require('./routes/mentalListingRoute');
const authRouter = require('./routes/authRoutes');
const app = express();

const PORT = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET;

//Session setup
const sessionStore = MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/SuubiMentalWellness'});


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/api/listings', listings);

//connecting to localDB instance
mongoose.connect('mongodb://127.0.0.1/SuubiMentalWellness').then(console.log('MongoDB Connected'));


//Server function
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//want app to connect to DB before it starts to run.
//right way to connect to database
//Node-API is the collection name.


/* mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Node API app is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
*/
