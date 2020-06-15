
const Users = [
    {
        id: 1,
        firstName: 'admin',
        lastName: 'admin'
    },
    {
        id: 2,
        firstName: 'Alina',
        lastName: 'Punko'
    }
];

module.exports = {
    getUserByFirstName: (firstName) => {
        return Users.find(user => user.firstName === firstName);
    },

    createUser: ({ firstName, lastName }) => {
        const id = Users.length + 1;
        const newUser = { id, firstName, lastName };
        Users.push(newUser);
        return newUser;
    }
};
