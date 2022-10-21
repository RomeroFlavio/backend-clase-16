const fs = require('fs');
const { option } = require('../moduls/config');
const knex = require('knex')(option.sqlite);
const DataBase = require('./DateBase');
const db = new DataBase('chat', knex);

class Chat{

    async save(message){
        // db.createTableChat();
        db.insert(message);
    }
    
    async getAll(){
        return await db.getAllDates();
    }
};

module.exports = new Chat();