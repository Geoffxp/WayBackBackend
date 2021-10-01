
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "gamer1", password: 'gamer', session: null},
        {username: "gamer2", password: 'remag', session: null},
        {username: "gamer3", password: 'truck', session: null}
      ]);
    });
};
