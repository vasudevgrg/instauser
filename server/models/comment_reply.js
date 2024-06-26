'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment_Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment_Reply.init({
    comment_id: DataTypes.INTEGER,
    reply_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment_Reply',
    tableName:'Comment_Reply'
  });
  return Comment_Reply;
};