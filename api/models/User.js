/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // DB 에 갑을 넣을 건데, 그걸 어떤 값을 넣을건지 정의를 해준다.

  // DB SCHEMA
  // Relational database - 숫자, 문자 ASCII, UTF-8
  // int a = 0; var a = 0.5; -> int integer, var variable

  // NoSQL -> MongoDb -> { name: 'abc', age: 24 } JSON
  // One-to-Many association

  attributes: {

    email: {
      type: 'EMAIL',
      required: true,
      unique: true
    },
    name: {
      type: 'STRING'
    },
    password: {
      type: 'STRING',
      minLength: 8,
      required: true,
    },
    permission: {
      type: 'STRING',
      enum: [ 'ADMIN', 'CUSTOMER' ],
      defaultsTo: 'CUSTOMER'
    },
    products: {
      collection: 'Product',
      via: 'createdBy'
    },
    // friends: {
    //   collection: 'User',
    //   via: 'friends'
    // }
  }
};
