'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey:'post_id'
      });

      Comment.belongsToMany(models.Comment, {
        through:models.Comment_Reply,
        as:'Comment',
        foreignKey:'comment_id',
        otherKey:'reply_id'
      });

      Comment.belongsToMany(models.Comment, {
        through:models.Comment_Reply,
        as:'Reply',
        foreignKey:'reply_id',
        otherKey:'comment_id'
      })
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    post_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    tableName:'Comment'
  });
  return Comment;
};