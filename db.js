const credentials = require('./credentials')
const mongoose = require('mongoose');
// const {connectionString} = credentials.mongo;
// if(!connectionString){
//   console.error('String Missing(MongoDB)');
//   process.exit(1);
// }
// mongoose.connect(connectionString);
const db = mongoose.connection
db.on('error', err => {
  console.error("MongoDB error: " + err.message);
  process.exit(1);
})
db.once('open', () => console.log('Connected to MongoDB'))

// seed vacation data (if necessary)
const Vacation = require('./models/vacation.js')
const findVacations = async () => {
  try {
    const vacations = await Vacation.find()
    if (vacations.length) return

    await Vacation.create([
      {
        name: 'Hood River Day Trip',
        slug: 'hood-river-day-trip',
        category: 'Day Trip',
        sku: 'HR199',
        description:
          'Spend a day sailing on the Columbia and enjoying craft beers in Hood River!',
        price: 99.95,
        tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
      },
      {
        name: 'Oregon Coast Getaway',
        slug: 'oregon-coast-getaway',
        category: 'Weekend Getaway',
        sku: 'OC39',
        description: 'Enjoy the ocean air and quaint coastal towns!',
        price: 269.95,
        tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
        inSeason: false,
        maximumGuests: 8,
        available: true,
        packagesSold: 0,
      },
      {
        name: 'Rock Climbing in Bend',
        slug: 'rock-climbing-in-bend',
        category: 'Adventure',
        sku: 'B99',
        description: 'Experience the thrill of climbing in the high desert.',
        price: 289.95,
        tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
        inSeason: true,
        requiresWaiver: true,
        maximumGuests: 4,
        available: false,
        packagesSold: 0,
        notes: 'The tour guide is currently recovering from a skiing accident.',
      },
    ])
  } catch (error) {
    console.error(error)
  }
}

findVacations()

module.exports = {
  getVacations : async (options = {}) => Vacation.find(options),
  addVacationInSeasonListener : async (email, sku) => {
    //do nothing
  }
}
