const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/react-testing2');
const { STRING } = require('sequelize');

const User = conn.define('user', {
    name: STRING(20)
});

const Laptop = conn.define('laptop', {
    name: STRING(20)
})

Laptop.belongsTo(User);

const syncAndSeed = async() => {
    await conn.sync({force:true});
    const [tom, alex, adam] = await Promise.all([
        User.create({ name:'tom' }),
        User.create({ name: 'alex' }),
        User.create({ name: 'adam' })
    ])

    await Promise.all([
        Laptop.create({userId: tom.id, name: "dell"}),
        Laptop.create({userId: adam.id, name: "apple"}),
        Laptop.create({userId: alex.id, name: "hp"}),
        Laptop.create({userId: alex.id, name: "apple"}),
    ])

}

module.exports = {
    syncAndSeed, User, Laptop
};