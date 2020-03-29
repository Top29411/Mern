db.createUser({
  user: "wassim-azirar",
  pwd: "linkedin",
  roles: [
    {
      role: "readWrite",
      db: "mern"
    }
  ]
});
