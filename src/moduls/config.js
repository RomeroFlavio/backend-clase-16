const option = {
    mysql:{
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './src/DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    }
}

module.exports = { option };