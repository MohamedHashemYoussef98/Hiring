const {personData} = require('../validators/hire')
const { google } = require('googleapis')
const {GoogleAuth} = require('google-auth-library')
module.exports = class Hire{
    constructor(){}
    static async Add(req , res){
        const data = req.body
        const validateData = await personData(data)
        if(validateData.valid){
            const auth = new GoogleAuth({
                keyFile : "credantials.json" ,
                scopes : "https://www.googleapis.com/auth/spreadsheets" ,
            })
            const spreadsheetId = "1lPLpGzYC8LnHvbs9xTSDB5IyOj8lkdfnBqQljhjVq8A"
            const client = await auth.getClient()
            const googleSheets = google.sheets({version : "v4" , auth : client})
            const metaData = await googleSheets.spreadsheets.get({
                auth,
                spreadsheetId
            })
            await googleSheets.spreadsheets.values.append({
                auth ,
                spreadsheetId,
                valueInputOption : "USER_ENTERED",
                range : "Hiring!A:F",
                resource:{
                    values : [
                        [data.title , data.years , data.unique,data.choose , data.career , data.cv]
                    ]
                }
            })
            return res.status(200).json({
                data ,
            })
        }else{
            return res.status(400).json({
                error : validateData.error.details
            })
        }
        
    }
    static async GetAll(req,res){
        const auth = new GoogleAuth({
            keyFile : "credantials.json" ,
            scopes : "https://www.googleapis.com/auth/spreadsheets" ,
        })
        const spreadsheetId = "1lPLpGzYC8LnHvbs9xTSDB5IyOj8lkdfnBqQljhjVq8A"
        const client = await auth.getClient()
        const googleSheets = google.sheets({version : "v4" , auth : client})
        const metaData = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId
        })
        const getRows = await googleSheets.spreadsheets.values.get({
            auth ,
            spreadsheetId,
            range : "Hiring!A:F"
        })
        return res.status(200).json(getRows.data)
    }
}