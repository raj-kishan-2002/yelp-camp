const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', )

  .then( () => {
    console.log('Mongo Seeding Connected Successfully');
  })
  .catch( err => {
    console.log('Mongo didnot connected!');
    console.log(err);
  });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author:'68a451539fd661aa8bf51cf0',
      title: `${sample(descriptors)} ${sample(descriptors)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt corporis iusto tempore dicta architecto et, ad, sunt deleniti, provident tenetur debitis. Praesentium perferendis esse magni aspernatur vitae quaerat nobis debitis.',
      price,
      geometry: {
        type: 'Point',
        coordinates:[
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dsh4zi6fu/image/upload/v1756010520/YelpCamp/mnxpntgfmv2smqbeijxr.jpg',
          filename: 'YelpCamp/mnxpntgfmv2smqbeijxr',
        },
        {
          url: 'https://res.cloudinary.com/dsh4zi6fu/image/upload/v1756010519/YelpCamp/ypipogrtgcemuv5tnwse.jpg',
          filename: 'YelpCamp/ypipogrtgcemuv5tnwse',
        }
      ],
    })
    await camp.save();
  }
};

seedDB().then( () => {
  mongoose.connection.close()
})