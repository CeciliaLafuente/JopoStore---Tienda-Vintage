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
}

module.exports= users;