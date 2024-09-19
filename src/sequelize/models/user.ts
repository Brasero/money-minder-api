import {Model} from "sequelize";

module.exports = (sequelize,DataTypes) => {
    class user extends Model{

    }
    user.init({
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        pseudo: DataTypes.STRING,
        mail: DataTypes.STRING,
        mdp: DataTypes.STRING,
        birthday: DataTypes.DATE,
        code_validation: {
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