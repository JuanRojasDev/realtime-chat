const { Sequelize, DataTypes } = require('sequelize');

// Se pueden cambiar estos valores según tu configuración de MySQL
const sequelize = new Sequelize('chatdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Message = sequelize.define('Message', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  avatarSeed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = { sequelize, Message };
