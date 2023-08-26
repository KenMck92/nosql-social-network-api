const { connect, connection } = require('mongoose');

connect('mongodb+srv://root:root@cluster0.kauqu1v.mongodb.net/developersApplications');

module.exports = connection;
