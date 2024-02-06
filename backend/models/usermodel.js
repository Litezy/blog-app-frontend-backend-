
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false } ,
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
        password: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        
    });
};
