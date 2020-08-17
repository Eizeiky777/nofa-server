'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.myAssociation = this.belongsTo(models.user);
      // or
      // this.myAssociation = models.MyModel.belongsTo(models.OtherModel);
    }
  };
  feature.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feature',
  });
  return feature;
};