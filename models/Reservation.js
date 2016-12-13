var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    checkIn: {type: String},
    checkOut: {type: String},
    person: {type: Number},
    userID: {type: Schema.Types.ObjectId, index: true, required: true},
    roomID: {type: Schema.Types.ObjectId, index: true, required: true}

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Reservation = mongoose.model('Reservation', schema);

module.exports = Reservation;