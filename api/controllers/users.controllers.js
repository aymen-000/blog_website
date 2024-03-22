const mongoose = require('mongoose');
const { users } = require('../Models/UserModel');

const getUsers = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 2;
        const search = req.query.search || null;

        // Construct the query dynamically based on provided parameters
        const query = {};
        
        
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        const fetchedUsers = await users.find(query)
                                      .skip(startIndex)
                                      .limit(limit)
                                      .exec();

        res.status(200).json(fetchedUsers);
    } catch (err) {
        next(err);
    }
};

module.exports = { getUsers };