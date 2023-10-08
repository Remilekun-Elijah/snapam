if(require('express')().get("env") === 'development') require("dotenv/config")
const environment = {};

environment.staging = {
 mongodbUrl: process.env.DB_URL,
 port: process.env.PORT || 9000
}

environment.development = {
 mongodbUrl: process.env.DB_URL ?? "mongodb+srv://remilekunelijah:09023007389@quiz-db.sqlaq.mongodb.net/snapamprod?retryWrites=true&w=majority",
 port: process.env.PORT || 9000
}

environment.production = {
 mongodbUrl: process.env.DB_URL,
 port: process.env.PORT
}

module.exports = environment[process.env.NODE_ENV || "development"] 