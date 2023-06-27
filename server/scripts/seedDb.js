const { User } = require('../model')
const Sequelize = require('sequelize');


/* NOTE: THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  /* Create the table for the agents */
  await User.sync({ force: true })

  /* Insert the data */
  await Promise.all([
    User.create({
      firstName: 'Amit',
      lastName: 'Patel',
       email: 'patelamyt@gmail.com',
       password: 'ceb6c970658f31504a901b89dcd3e461', 
       joinDate: Sequelize.literal('CURRENT_TIMESTAMP'),
       refreshToken: null,
    }),
  ])
}