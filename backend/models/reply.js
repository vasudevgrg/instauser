'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reply.belongsToMany(models.Reply, {
        through:models.Comment_Reply,
        as:'Comment',
        foreignKey:'comment_id',
        otherKey:'reply_id'
      });

      Reply.belongsToMany(models.Reply, {
        through:models.Comment_Reply,
        as:'Reply',
        foreignKey:'reply_id',
        otherKey:'comment_id'
      })
    }
  }
  Reply.init({
    parent_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reply',
    tableName:'Reply'
  });
  return Reply;
};