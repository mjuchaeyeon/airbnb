var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    checkin: {type: String},
    checkout: {type: String},
    person: {type: Number},
    userid: {type: Schema.Types.ObjectId, index: true, required: true},
    roomid: {type: Schema.Types.ObjectId, index: true, required: true}
    // title: {type: String}, // 숙소 이름
    // city: {type: String},   // 머무를 나라
    // address: {type: String}, // 숙소 주소
    // charge: {type: Number},
    // comment: {type: String}, // 숙소에 대한 설명
    // createdAt: {type: Date, default: Date.now},
    // read: {type: Number, default: 0}

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Reservation = mongoose.model('Reservation', schema);

module.exports = Reservation;