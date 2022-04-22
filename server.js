const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, '/uploads')));
const hireRoutes = require('./routes/hire')
app.use('/api' , hireRoutes)

const server = app.listen(PORT , ()=>{
    console.log(`Listening on PORT ${PORT}`)
})