'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: true,
        // msg : "ulah kosong bageur"
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {
    getterMethods: {
      nameAndId: function() {
        return this.username + ' ' + this.id
      },

    },
    // setterMethods: {
    //   xxx: () => {
    //     return this.username
    //   }
    // }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
