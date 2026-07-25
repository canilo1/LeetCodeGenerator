

const createUsersTable = `CREATE TABLE Profile (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
    Notes 
);`;

module.exports = createUsersTable;