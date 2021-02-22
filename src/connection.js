const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:lucio@localhost:5432/g4flex')
//new Sequelize('postgres://user:pass@example.com:5432/dbname') <---

module.exports = {
    sequelize: function(){
        return sequelize;
    },
    QueryTypes: function(){
        return QueryTypes;
    }
}