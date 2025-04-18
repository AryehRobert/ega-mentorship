const getUsers = (req, res) => {
    res.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]);
  };
  
  const createUser = (req, res) => {
    const { name } = req.body;
    res.status(201).json({ message: `User ${name} created` });
  };
  
  module.exports = { getUsers, createUser };
  