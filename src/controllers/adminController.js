const fs= require('fs');
const path= require ('path');

const productsPath= path.join(__dirname,'../data/productsDataBase.json');
const products= JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    createProduct: (req, res) => {
        res.render ('./admin/createProduct');
    },
    
    storeProduct: (req, res) => {
       
        /***** Obtengo el máximo ID utilizado *****/
        let maxId = Math.max ( ...products.map ( product => {
                return product.id;
        }));

        /***** Completo los campos del nuevo producto *****/
        let newProduct = req.body;
        newProduct.price = parseInt (newProduct.price);
        newProduct.discount = newProduct.discount != ''? parseInt (newProduct.discount) : 0;
        newProduct.id = maxId + 1;
        newProduct.image = '/images/' + req.body.category + '/' + req.file.filename;

        products.push (newProduct);

        fs.writeFileSync ( productsPath, JSON.stringify (products, null, ' ' ) );

        res.redirect ('/');
    },

    productDetail: (req, res) => {
        let product = products.find (valor=>{
            return valor.id == req.params.id;
        });

        res.render ('./admin/productDetailAdmin', {product, toThousand});
      
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
                    valor.price= parseInt(req.body.price);
                    valor.discount = req.body.discount = ''? 0 : parseInt(req.body.discount);
                }
                });
                   
                    if (req.file){
                        products.forEach(valor=>{
                            if (valor.id==req.params.id){
                        valor.image= '/images/' + req.body.category + '/' + req.file.filename;
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