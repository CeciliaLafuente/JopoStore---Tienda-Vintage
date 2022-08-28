const fs = require ('fs');

const users = {
    fileName: './src/data/usersDataBase.json',

    findAll: function () {
        return JSON.parse ( fs.readFileSync (this.fileName), 'utf-8');  
    },

    
    writeFile: function (user) {
        fs.writeFileSync(this.fileName, JSON.stringify (user, null, ' ' ) );
        return true;
    },

    findByPk: function (id) {
        let users = this.findAll();

        let user = users.find (user => {
            return user.id == id
        })

        return user;
    }
}

module.exports= users;