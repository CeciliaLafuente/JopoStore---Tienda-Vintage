const fs= require('fs');
const path= require ('path');

const productsPath= path.join(__dirname,'../data/productsDataBase.json');
const products= JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const controller = {
    createProduct: (req, res) => {
        res.render ('./admin/createProduct');
    },

    productDetail: (req, res) => {
        let product= products.filter(valor=>{
            return valor.id== req.params.id;
        });
        res.render ('./admin/productDetailAdmin', {product});
    },

    edit: function (req,res){
        let product= req.params.id;
        let productFind= products.find(valor=>{
            return valor.id==product;
        })
        res.render('./admin/modifyProduct', {productFind});
    },

    update: function (req,res){
        
            products.forEach(valor=>{
                if (valor.id==req.params.id){
                    
                    valor.name=req.body.name;
                    valor.description=req.body.description;
                    valor.category=req.body.category;
                    valor.price=req.body.price;
                    
                }
                });
                   
                    if (req.file){
                        products.forEach(valor=>{
                            if (valor.id==req.params.id){
                        valor.image= req.file.filename;
                    }
                });
                    }
                    const productsJson= JSON.stringify(products, null, ' ');
                    fs.writeFileSync(productsPath ,productsJson);
    
                    res.redirect('/');
    },

    destroy: function (req,res){
        
        let deleteProduct=[];
        products.forEach((valor, indice) => {
            if(valor.id==req.params.id){
                deleteProduct= indice;
            }
        });
        products.splice(deleteProduct, 1);
        const productsJson= JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsPath, productsJson);
        res.redirect ('/');
    }

}


module.exports = controller;