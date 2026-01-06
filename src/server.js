const app = require('./app.js')
const Sequelize = require('./config/sequelize.js')

const assetService = require('./services/asset_service.js');


require('./models')

const PORT = 3000

async function startServer(){
    try{
        await Sequelize.authenticate()
        console.log("Connection success")

        await Sequelize.sync({alter:true})
        console.log("DBS Model synced")

        app.listen(PORT, ()=>{
            console.log("Server is running")
        })
    }catch(err){
        console.log('Failed to start', err.message)
        process.exit(1)
    }
}


startServer()


