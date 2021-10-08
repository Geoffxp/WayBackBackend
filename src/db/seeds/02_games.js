const DEFAULT_URL = `http://localhost:5000/images`;
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          game_id: 1, 
          name: 'AstroDisastro', 
          url: "https://astro-disatro-js.vercel.app/", 
          img_src: `${DEFAULT_URL}/astrodisastroscreen.PNG`
        },
        {
          game_id: 2, 
          name: 'BrickBreaker', 
          url: "https://brick-breaker-iota.vercel.app/", 
          img_src: `${DEFAULT_URL}/brickbreakerscreen.PNG`
        },
      ]);
    });
};
