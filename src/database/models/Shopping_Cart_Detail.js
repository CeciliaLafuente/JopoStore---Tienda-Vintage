

module.exports= (Sequelize, DataTypes)=>{
    let alias='ShoppingDetail';

    let cols={
        id:{
            type: DataTypes.INTEGER,
            primarykey:true,
            autoIncrement:true,
            allowNull: false
        },
        shopping_cart_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        discount:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let config={
        tableName:'shopping_cart_detail',
        timeStamps:false
    }

    const ShoppingDetail=Sequelize.define(alias,cols,config);

    ShoppingDetail.associate= function(models){
        ShoppingDetail.belongsTo(models.Shopping,{
            as:'shoppingDetail',
            foreignKey:'shopping_cart_id'
        })


    ShoppingDetail.belongsTo(models.Products,{
        as:'product_shoppingDetail',
        foreignKey:'product_id'
    })
}

    return ShoppingDetail;
}