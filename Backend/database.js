
const mongoose = require('mongoose');

async function mongoDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const foodItemsCollection = mongoose.connection.db.collection('Food_items');
    const foodCategoryCollection = mongoose.connection.db.collection('Food_Category');

    const data = await foodItemsCollection.find({}).toArray();
    const catData = await foodCategoryCollection.find({}).toArray();

    // console.log('Food Items:', foodItemsData);
    // console.log('Food Category:', foodCategoryData);

    global.Food_items = data;
    global.Food_Category = catData;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}
module.exports = mongoDB;
