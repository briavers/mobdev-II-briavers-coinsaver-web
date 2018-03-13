const Post = require('../models/post');

exports.get_posts = function(req, res) {
  /*const postDetail = { title: 'Valve geeft Dota 2-spelers maandelijks abonnement voor extra content als optie', synopsis: 'Valve heeft Dota Plus aangekondigd, een maandelijkse abonnement voor Dota 2 waarmee spelers onder meer toegang krijgen tot cosmetische items, individuele herolevels en een tool die de spelerstatistieken bijhoudt.' };
  const post = new Post(postDetail);
  post.save((err) => {
    if(err) {

    }

    console.log(`Post ${ post.title } is saved`);
  });*/
  const query = Post.find();
  query.sort( { created_at: -1 } );
  query.exec((err, posts) => {
    if (err) return handleError(err);
    return res.json(posts);
  });
}