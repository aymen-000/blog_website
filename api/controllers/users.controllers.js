const mongoose = require('mongoose');
const { users } = require('../Models/UserModel');
const { errorHandler } = require('../utils/error');

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
                                        

        const usersWithoutPasswords = fetchedUsers.map(user => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const numUsers = await users.countDocuments();

        const date = new Date();
        const mydate = {
            fullyear: date.getFullYear(),
            month: date.getMonth(), // No need to subtract 1
            day: date.getDate() // Changed from getDay() to getDate()
        };

        // Construct date for one month ago
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const usersForLastMonth = await users.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });

        res.status(200).json({ usersWithoutPasswords, numUsers, usersForLastMonth });
    } catch (err) {
        next(err);
    }
};
const deleteUsers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await users.findById(id); // Corrected
        if (!findUser.isAdmin) {
            await users.findByIdAndDelete(id);
            res.status(200).json('ok');
        } else {
            // Assuming errorHandler is a function that generates an error object
            next(errorHandler(401, 'Cannot delete admin'));
        }
    } catch(err) {
        next(err);
    }
};
module.exports = { getUsers , deleteUsers };