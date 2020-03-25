db.createUser({
  user: 'wassim',
  pwd: 'azerty',
  roles: [
    {
      role: 'readWrite',
      db: 'mern'
    }
  ]
});
