const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const {PORT}=require('./config/serverConfig');
const apiRoutes=require('./routes/index');
const db=require('./models/index');
const {FLIGHT_SERVICE_PATH}=require('./config/serverConfig');

const setup_and_start_server=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
        //  console.log(FLIGHT_SERVICE_PATH);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
    })
}


setup_and_start_server();