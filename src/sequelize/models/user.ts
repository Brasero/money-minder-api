import {Model} from "sequelize";

module.exports = (sequelize,DataTypes) => {
    class user extends Model{

    }
    user.init({
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        mail: DataTypes.STRING,
        mdp: DataTypes.STRING,
        birthday: DataTypes.DATE,
        code_recup: {
            type: DataTypes.STRING,
            defaultValue: null,
        }
    },{
        sequelize,
        modelName: 'user',
        tableName: 'users'
    });
    return user;
};