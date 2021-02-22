const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:lucio@localhost:5432/g4flex')
//new Sequelize('postgres://user:pass@example.com:5432/dbname') <---
/*
    try {
		await connection.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
	    console.error('Unable to connect to the database:', error);
	}
*/


module.exports = {
    sequelize: function(){
        return sequelize;
    },
    QueryTypes: function(){
        return QueryTypes;
    }
}