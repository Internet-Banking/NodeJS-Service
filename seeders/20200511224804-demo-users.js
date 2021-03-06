'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.imageUrl(),
      phone: faker.phone.phoneNumber(),
      password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
