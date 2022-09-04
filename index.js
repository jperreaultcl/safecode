const users = require('./lib/users');
const validateUsers = require('./fixme');

const validatedUsers = validateUsers(users);

validatedUsers.allusers.forEach(u => {
    validatedUsers.print(u);
});