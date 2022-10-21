const db = require('../../database/models')
const Sequelize = require('sequelize');
const { promiseImpl } = require('ejs');
const Op = Sequelize.Op;

const controller = {

    list: (req, res) => {

        let productArray = [];
        let countByCategory = {};   

        const getProducts = db.Products
                                .findAll({
                                include: [ {association: 'colors'} ],
                                })

        const getCategories =   db.Product_Categories
                                    .findAll({
                                    include: [ {association: 'products'} ],
                                })

        Promise.all ( [ getProducts, getCategories] )
            .then ( ([ products, categories ]) => {

            // products array
                products.forEach ( product => {
                    let productData = {
                        id: product.id, 
                        name: product.name, 
                        description: product.description, 
                        colors: product.colors,
                        url: 'http://localhost:3040/api/products/' + product.id
                    } ;
            
                    productArray.push ( productData );
                })
            
            // countByCategory 
                categories.forEach ( category => {
                    countByCategory [category.name] = category.products.length;
                })

            // result
                let data = {
                    count: products.length,
                    countByCategory: countByCategory,
                    products: productArray,
                };

                return res.status(200).json (
                    {
                        meta: {
                            status : 200,
                            url: 'api/products',
                            
                    },
                        data: data
                    }    
                );
            })
            .catch ( e => console.log (e))

    },

    detail: (req, res) => {

        db.Products.findByPk ( req.params.id, {
            include: [ {association: 'colors'} ],
        })
        .then ( product => {

            return res.status(200).json (
                {
                    meta: {
                        status: 200,
                        url: 'api/products/:' + req.params.id,
                        product_id: req.params.id,
                    },
                    data: product
                }
            )

        })
        .catch ( e => console.log ( e ))
            
    },


}


module.exports = controller;