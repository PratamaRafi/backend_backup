'use strict';
const express = require('express');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

var fs = require('fs');
var privateKey = fs.readFileSync('ssl_kibble/key_kibble.pem');
var certificate = fs.readFileSync('ssl_kibble/cert_kibble.pem');
var credentials = {key: privateKey, cert: certificate};

const app = express();
const setupPassport = require('./configs/passportConfig')
const errorHandler = require('./middlewares/errorHandler')
const PORT = process.env.PORT || 3030;


dotenv.config();
app.use(express.json());
app.use(cors())


//Import Routes
const userRoutes = require('./routes/user');
const consulRoutes = require('./routes/consultation');
const scheduleRoutes = require('./routes/schedule');
const vendorRoutes = require('./routes/vendor');
const withdrawRoutes = require('./routes/withdraw');
const vendorbankRoutes = require('./routes/vendorBank');
const userbankRoutes = require('./routes/userBank');
const adminsRoutes = require('./routes/admins');
const articlesRoutes = require('./routes/articles');
const classroutes = require('./routes/class');
const userPetsRoutes = require('./routes/userPets')
const speciesRoutes = require('./routes/species');
const useraddressRoutes = require('./routes/userAddress');
const vaccineRoute = require('./routes/vaccine');
const petRoute = require('./routes/pet');
const provinceRoute = require('./routes/province');
const feedbackRoutes = require('./routes/feedback');
// const petlistRoutes = require('./routes/petlist-routes');
// const authRoute = require('./routes/auth');
// const apptRoute = require('./routes/appointment-routes');
// const profileRoute = require('./routes/uprofile-routes');
// const vetprofileRoute = require('./routes/vetprofile-routes');
// const vetscheduleRoute = require('./routes/vetschedule-routes');



app.use(express.json());
app.use(bodyParser.json());
setupPassport(app);

app.get("/", (req, res) => {
    res.send("Haloo halo")
})

//Route Middlewares
app.use('/api', userRoutes.routes);
app.use('/api', consulRoutes.routes);
app.use('/api', scheduleRoutes.routes);
app.use('/api', vendorRoutes.routes);
app.use('/api', withdrawRoutes.routes);
app.use('/api', vendorbankRoutes.routes);
app.use('/api', userbankRoutes.routes);
app.use('/api', adminsRoutes.routes);
app.use('/api', articlesRoutes.routes);
app.use('/api', classroutes.routes);
app.use('/api', userPetsRoutes.routes);
app.use('/api', speciesRoutes.routes);
app.use('/api', useraddressRoutes.routes);
app.use('/api', vaccineRoute.routes);
app.use('/api', petRoute.routes);
app.use('/api', provinceRoute.routes);

app.use('/api', feedbackRoutes.routes);
// app.use('/api', petlistRoutes.routes);
// app.use('/api/user', authRoute);
// app.use('/api', apptRoute.routes);
// app.use('/api/user', profileRoute.routes);
// app.use('/api/vet', vetprofileRoute.routes);
// app.use('/api/vet', vetscheduleRoute.routes);
app.use(errorHandler);

var httpsServer = https.createServer(credentials,app);

httpsServer.listen(8080, ()=> {
    console.log("HTTP Server listen on port 8080");
})

app.listen(PORT, () => console.log(`App listening http://103.150.87.235:${PORT}`))


