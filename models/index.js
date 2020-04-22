// Accounts' Schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4');

const Vote = new Schema(
    {
        nom: String,
        prenom: String,
        email: String,
        vote: String,
        filliere: String,
        token: {
            type: String,
            default: uuidv4()
        },
        emailconfirmation: Boolean,
        adminconfirmation: Boolean
    });

module.exports = {
    Vote: mongoose.model('Vote',Vote),
};