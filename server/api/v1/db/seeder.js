

// //console.log('This script populates some test posts to your database. Specified database as argument - e.g.: seeder mongodb://your_username:your_password@your_dabase_url');

// /*
// Cool programe
// */

// /*
// Libraries
// */
// const async = require('async');
// const mongoose = require('mongoose');
// const faker = require('faker');

// /*
// Models
// */
// const Blog = require('../models/blog');
// const Category = require('../models/category');
// const Post = require('../models/post');

// // Get arguments passed on command line
// const userArgs = process.argv.slice(2);
// if (!userArgs[0].startsWith('mongodb://')) {
//   //console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
//   return;
// }

// /*
// Faker
// */
// faker.local = 'nl';

// /*
// Mongoose
// */
// const mongoDB = userArgs[0];
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// /*
// Variables
// */
// let blogs = [];
// let categories = [];
// let posts = [];

// function blogCreate(title, synopsis, categoryId, posts, cb) {
//   const blogDetail = { title: title, synopsis: synopsis, _category: categoryId, posts: posts };
//   const blog = new Blog(blogDetail);

//   blog.save((err) => {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     //console.log('New Blog: ' + blog);
//     blogs.push(blog);
//     cb(null, blog);
//   });
// }

// function categoryCreate(name, description, cb) {
//   const categoryDetail = { name: name, description: description };
//   const category = new Category(categoryDetail);

//   category.save((err) => {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     //console.log('New category: ' + category);
//     categories.push(category);
//     cb(null, category);
//   });
// }

// function postCreate(title, synopsis, body, thumbnailUrl, categoryId, cb) {
//   const postDetail = { title: title, synopsis: synopsis, body: body, thumbnailUrl: thumbnailUrl, _category: categoryId };
//   const post = new Post(postDetail);

//   post.save((err) => {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     //console.log('New Post: ' + post);
//     posts.push(post)
//     cb(null, post)
//   });
// }

// function createBlogs(cb) {
//   async.parallel([
//     function(callback) {
//       blogCreate(faker.lorem.sentence(), faker.lorem.paragraph(), getRandomCategory(), getRandomPosts(), callback);
//     },
//   ],
//   cb);
// }

// function createCategories(cb) {
//   async.parallel([
//     function(callback) {
//       categoryCreate(faker.lorem.word(), faker.lorem.sentence(), callback);
//     },
//     function(callback) {
//       categoryCreate(faker.lorem.word(), faker.lorem.sentence(), callback);
//     },
//     function(callback) {
//       categoryCreate(faker.lorem.word(), faker.lorem.sentence(), callback);
//     },
//     function(callback) {
//       categoryCreate(faker.lorem.word(), faker.lorem.sentence(), callback);
//     },
//   ],
//   cb);
// }

// function createPosts(cb) {
//   async.parallel([
//     function(callback) {
//       postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
//     },
//     function(callback) {
//       postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
//     },
//     function(callback) {
//       postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
//     },
//     function(callback) {
//       postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
//     },
//     function(callback) {
//       postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
//     },
//     function(callback) {
//       postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
//     },
//   ],
//   cb);
// }

// function getRandomCategory() {
//   if (categories && categories.length > 0) {
//     const category = categories[Math.round(Math.random()*(categories.length-1))];
//     return category;
//   }
//   return null;
// }

// function getRandomPosts() {
//   if (posts && posts.length > 0) {
//     const nPosts = Math.round(Math.random()*(posts.length-1));
//     const cPosts = posts.slice(0, posts.length);
//     while(cPosts.length > nPosts) {
//       cPosts.splice(Math.round(Math.random()*(posts.length-1)), 1);
//     }
//     return cPosts;
//   }
//   return null;
// }

// /*
// Asynchronous series
// */
// async.series([
//   createCategories,
//   createPosts,
//   createBlogs,
// ],
// function(err, results) {
//   if (err) {
//     //console.log(`FINAL ERR: ${err}`);
//   }
//   mongoose.connection.close();
// });



//----------------------------------------
//----------------------------------------
//----------------------------------------
//----------------------------------------
//----------------------------------------
//----------------------------------------



/*
server seeding
*/
//console.log('This script populates some test imageSets to your database. Specified database as argument - e.g.: seeder mongodb://your_username:your_password@your_dabase_url');

/*
Cool programe
*/

/*
Libraries
*/
const async = require('async');
const faker = require('faker');

/*
Models
*/
const Image = require('./server/api/v1/models/images');
const ImageSet = require('./server/api/v1/models/imgSet')
const SubCategory = require('./server/api/v1/models/subCategory')


/*
Faker
*/
faker.local = 'nl';

/*
Mongoose
*/
const mongoDB = mongoDbConnectionString;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
Variables
*/
let images = [];
let imageSets = [];
let subCategories = [];

function imagesCreate(title, imgLink, imgSize, cb) {
  const imagesDetail = {
    title: title,
    imgLink: imgLink,
    imgSize: imgSize,
  };
  const images = new Image(imagesDetail);

  images.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    //console.log('New Image: ' + images);
    images.push(images);
    cb(null, images);
  });
}

function subcategoryCreate(name, description, cb) {
  const subcategoryDetail = {
    name: name,
    description: description
  };
  const subcategory = new SubCategory(subcategoryDetail);

  subcategory.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    //console.log('New subcategory: ' + subcategory);
    subCategories.push(subcategory);
    cb(null, subcategory);
  });
}

function imageSetCreate(title, amount, body, thumbnailUrl, subcategoryId, cb) {
  const imageSetDetail = {
    title: title,
    amount: amount,
    body: body,
    thumbnailUrl: thumbnailUrl,
    _subcategory: subcategoryId
  };
  const imageSet = new ImageSet(imageSetDetail);

  imageSet.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    //console.log('New ImageSet: ' + imageSet);
    imageSets.push(imageSet)
    cb(null, imageSet)
  });
}

function createImages(cb) {
  async.parallel([
      function (callback) {
        imagesCreate(faker.lorem.sentence(), Math.floor(Math.random() * Math.floor(1000)), getRandomCategory(), getRandomImageSets(), callback);
      },
    ],
    cb);
}

function createCategories(cb) {
  async.parallel([
      function (callback) {
        subcategoryCreate(faker.lorem.word(), Math.floor(Math.random() * Math.floor(1000)), callback);
      },
      function (callback) {
        subcategoryCreate(faker.lorem.word(), Math.floor(Math.random() * Math.floor(1000)), callback);
      },
      function (callback) {
        subcategoryCreate(faker.lorem.word(), Math.floor(Math.random() * Math.floor(1000)), callback);
      },
      function (callback) {
        subcategoryCreate(faker.lorem.word(), Math.floor(Math.random() * Math.floor(1000)), callback);
      },
    ],
    cb);
}

function createImageSets(cb) {
  async.parallel([
      function (callback) {
        imageSetCreate(faker.lorem.sentence(), Math.floor(Math.random() * Math.floor(1000)), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
      },
      function (callback) {
        imageSetCreate(faker.lorem.sentence(), Math.floor(Math.random() * Math.floor(1000)), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
      },
      function (callback) {
        imageSetCreate(faker.lorem.sentence(), Math.floor(Math.random() * Math.floor(1000)), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
      },
      function (callback) {
        imageSetCreate(faker.lorem.sentence(), Math.floor(Math.random() * Math.floor(1000)), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
      },
      function (callback) {
        imageSetCreate(faker.lorem.sentence(), Math.floor(Math.random() * Math.floor(1000)), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
      },
      function (callback) {
        imageSetCreate(faker.lorem.sentence(), Math.floor(Math.random() * Math.floor(1000)), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
      },
    ],
    cb);
}

function getRandomCategory() {
  if (subCategories && subCategories.length > 0) {
    const subcategory = subCategories[Math.round(Math.random() * (subCategories.length - 1))];
    return subcategory;
  }
  return null;
}

function getRandomImageSets() {
  if (imageSets && imageSets.length > 0) {
    const nImageSets = Math.round(Math.random() * (imageSets.length - 1));
    const cImageSets = imageSets.slice(0, imageSets.length);
    while (cImageSets.length > nImageSets) {
      cImageSets.splice(Math.round(Math.random() * (imageSets.length - 1)), 1);
    }
    return cImageSets;
  }
  return null;
}

/*
Asynchronous series
*/
async.series([
    createCategories,
    createImageSets,
    createImages,
  ],
  function (err, results) {
    if (err) {
      //console.log(`FINAL ERR: ${err}`);
    }
    mongoose.connection.close();
  });
