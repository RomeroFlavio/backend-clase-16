const { option } = require('../moduls/config');
const knex = require('knex')(option.mysql);
const DataBase = require('./DateBase');
const db = new DataBase('products', knex);

class Products {
    constructor(){
        this.products = [];
        this.id = 0;
    }

    addProdutcs(product){
        // db.createTableProducts();
        db.insert(product);
    }

    async getAll(){
        return await db.getAllDates();
    }
}

const products = new Products();

module.exports = products;