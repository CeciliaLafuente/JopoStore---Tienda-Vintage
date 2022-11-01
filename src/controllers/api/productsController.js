const db = require('../../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const controller = {

    list: (req, res) => {

    // Accepts a query string with:
    //  page=N  returns page number N, considering 10 products per page
    //  search=KEYWORD  returns products containing KEYWORD in name, description
    // With no query string, returns all products

        let productArray = [];
        let countByCategory = [];
        let findParameters = {};
        
        if (req.query.page) {
            findParameters = {
                include: [ {association: 'colors'} ],
                limit: 10, 
                offset: (req.query.page - 1) * 10
                }
        } else {
            findParameters = {
                include: [ {association: 'colors'} ],
                }
        }
      

         findParameters = {
            include: [ {association: 'colors'}, {association: 'product_category'} ]
            };
            
        let whereClause;
        let offsetClause;
        
        
    // where clause to use in findAll
        if (req.query.search) { 
            let keyword = `%${req.query.search}%`;
        
            whereClause = { [Op.or]:
                            [
                                {name: { [Op.like]: keyword }}, 
                                {description: { [Op.like]: keyword }}, 
                                // {'$product.product_category.name$': { [Op.like]: keyword }}, 
                                // {'$product.colors.color.name$': { [Op.like]: keyword }}
                            ]
                        };
            findParameters.where = whereClause;
        }
        
    // offset clause to use in findAll
        if (req.query.page) {
            offsetClause = (req.query.page - 1) * 10;
        
            findParameters.offset = offsetClause;
            findParameters.limit = 10;
        }
    
console.log (findParameters);
        const getProducts = db.Products
                                .findAll(findParameters);

        const getCategories =   db.Product_Categories
                                    .findAll({
                                    include: [ {association: 'products'} ],
                                });

        Promise.all ( [ getProducts, getCategories] )
            .then ( ([ products, categories ]) => {

            // products array
                products.forEach ( product => {
                    let productData = {
                        id: product.id, 
                        name: product.name, 
                        description: product.description, 
                        colors: product.colors,
                        url: 'http://localhost:3040/api/products/' + product.id,
                        categoryId: product.product_category.id,
                        categoryName: product.product_category.name,
                        img: product.img,
                        discount: product.discount,
                        price: product.price
                    } ;
            
                    productArray.push ( productData );
                })
            
            // countByCategory 
                categories.forEach ( category => {
                    let data={
                        name: category.name,
                        quantity: category.products.length
                    }

                countByCategory.push(data);
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
            let productModify=[];
            let data={
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                discount: product.discount,
                img: product.img,
                colors: product.colors,
                url: 'api/products/:' + req.params.id,
            }
            productModify=data

            return res.status(200).json (
                {
                    meta: {
                        status: 200,
                        product_id: req.params.id,
                    },
                    data: productModify
                }
            )

        })
        .catch ( e => console.log ( e ))
            
    },

    categoryList: (req, res) => {

                const getCategories =   db.Product_Categories
                    .findAll({
                })
                .then ( ( categories) => {
                return res.status(200).json ( 
                    {
                        meta: {
                            status: 200
                        },
                        data: {
                            count: categories.length,   
                            categories
                        }
                    })
            })
    },

    
}


module.exports = controller