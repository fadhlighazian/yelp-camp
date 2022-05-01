const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// connect mongoose
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your USER ID
      author: '6251126102f1bbf0994cfadb',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi libero quibusdam voluptas, doloribus nisi exercitationem blanditiis corporis nobis autem iure. Voluptate incidunt voluptatum sunt natus laborum ratione repudiandae explicabo praesentium!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/df7woekxk/image/upload/v1650963372/YelpCamp/xjfaqaghraaykfid3vb5.jpg',
          filename: 'YelpCamp/xjfaqaghraaykfid3vb5',
        },
        {
          url: 'https://res.cloudinary.com/df7woekxk/image/upload/v1650963373/YelpCamp/t92ijezwr7zgkbh61v9i.jpg',
          filename: 'YelpCamp/t92ijezwr7zgkbh61v9i',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
