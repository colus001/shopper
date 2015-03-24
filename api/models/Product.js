/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    // id: {
    //   Automatically generated
    // },
    createdBy: { // ObjectId, UUID, Integer
      model: 'User',
      required: true
    },
    name: {
      type: 'STRING',
      required: true
    },
    price: {
      type: 'INTEGER',
      required: true
    },
    description: {
      type: 'STRING',
      required: true
    }
  }
};
