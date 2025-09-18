db = db.getSiblingDB('blog_list_dev');

db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'blog_list_dev',
    },
  ],
});

db.createCollection('users');