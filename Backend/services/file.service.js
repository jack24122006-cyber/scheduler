const fs = require('fs')
const path = require('path')

const DB_MAP = {
  'grade': process.env.GRADE_DB_PATH
};

const getDBPath = (key)=>{
    if(!DB_MAP[key]){
        throw new Error('Unknown DB path type')
    }
    return path.join(__dirname,'..', DB_MAP[key])
}

const readDB = async(dbPath) =>{
    if(!fs.existsSync(dbPath)){
        fs.writeFileSync(dbPath, JSON.stringify('[]'))
    }
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
}

const writeDB = async(dbPath,data)=>{
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

module.exports = {
    getDBPath,
    readDB,
    writeDB
}