const fs = require ('fs');

const Category = {
    findAll: function () {
      return JSON.parse ( fs.readFileSync ('./src/data/categoriesDataBase.json'), 'utf-8');  
    }
}

module.exports = Category;