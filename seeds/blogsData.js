const { Painting } = require('../models');

const paintingdata = [
  {
    title: 'Blossoming Apricot',
    artist: 'LedyX',
    exhibition_date: 'March 30, 2018',
    gallery_id: 1,
    filename: '01-blossoming-apricot.jpg',
    description:
      'Branches with pink apricot blossoms against a blue background.',
  },
  {
    title: 'Cosmos Flowers',
    artist: 'WStudio',
    exhibition_date: 'May 05, 2017',
    gallery_id: 1,
    filename: '02-cosmos-flowers.jpg',
    description: 'Pink cosmos flowers against a blue sky.',
  },
  {
    title: 'Sand + Sea = Summer',
    artist: 'S_Photo',
    exhibition_date: 'June 10, 2019',
    gallery_id: 2,
    filename: '03-sand-sea-summer.jpg',
    description: 'Sandy beach with the blue sea and sky in the background.',
  },
];

const seedPaintings = () => Painting.bulkCreate(paintingdata);

module.exports = seedPaintings;
