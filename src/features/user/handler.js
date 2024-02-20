const { User } = require('../../models/user/user');
const mongoose = require('mongoose');

exports.findUserById = async (_id) => {
    const user = await User.findOne({ _id })
        .populate({
            path: 'wallet',
            select:
                'iban balance transactions owner',
            populate: {
                path: 'transactions',
                select: 'date amount description'
            },
        });
    return user;
};

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({
        email,
    });
    if (!user) {
        return false;
    }
    return user;
};

exports.addWallet = async (_id, walletId) => {
    const user = await User.findByIdAndUpdate({
        _id,
    }, { wallet: walletId });
    if (!user) {
        return false;
    }
    return user;
};
