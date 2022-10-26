const db = require('../../database/models')
const Sequelize = require('sequelize');

const controller = {

    list: (req, res) => {

        let categoriesArray = [];

        db.Product_Categories
            .findAll({
                include: [{ association: 'products' }],
            })

            .then(categories => {

            // categories array
            categories.forEach ( category => {
                let categoryData = {
                    id: category.id, 
                    name: category.name, 
                    description: category.img,
                } ;
        
                categoriesArray.push ( categoryData );
                console.log(categoriesArray)
            })

                let data = {
                    count: categories.length,
                    categories: categoriesArray,
                };
                return res.status(200).json (
                    {
                        meta: {
                            status : 200,
                            url: '/api/categories',
                            
                    },
                        data: data
                    }    
                );
                })
                .catch ( e => console.log (e))
    }
}


module.exports = controller;