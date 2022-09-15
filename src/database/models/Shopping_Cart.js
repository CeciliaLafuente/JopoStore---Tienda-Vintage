module.exports=(Sequelize, DataTypes)=>{
    let alias='Shopping';

    let cols={
        id:{
            type: DataTypes.INTEGER,
            primarykey:true,
            autoIncrement:true,
            allowNull: false
        },
        address_line1:{
            type: DataTypes.STRING,
        },
        address_line2:{
            type: DataTypes.STRING,
        },
        city:{
            type: DataTypes.STRING,
        },
        zip_code:{
            type: DataTypes.INTEGER,
        },
        payment_type:{
            type: DataTypes.INTEGER,
        }
    }


    let config={
        tableName:'shopping_cart',
        timeStamps: false
    }

    const Shopping= Sequelize.define(alias,cols,config);

    Shopping.associate= function(models){
        Shopping.hasMany(models.ShoppingDetail,{
            as:'shoppingCart',
            foreignKey:'shopping_cart_id'
        })
    }

    return Shopping;
}