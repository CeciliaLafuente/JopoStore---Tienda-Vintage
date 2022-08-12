const fs = require ('fs');

const Product = {
    findAll: function () {
        return JSON.parse ( fs.readFileSync ('./src/data/productsDataBase.json'), 'utf-8');  
    },
    filterByCategory: function (category)  {
        let products = this.findAll();

        let productsByCategory =  products.filter (product => {
            return product.category == category;
        });
        
        return productsByCategory;
    },
    findById: function (id) {
        let products = this.findAll();

        let product = products.find(valor => {
            return valor.id == id;
        });
        return product;
    },
    findSpecial: function() {
        let products = this.findAll();

        let specialProducts = products.filter (product => {
            product.special == 1;
        })

        return specialProducts;
    }
}

module.exports = Product;