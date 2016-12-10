var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    host: {type: String},
    title: {type: String}, // 숙소 이름
    city: {type: String},   // 머무를 나라
    address: {type: String}, // 숙소 주소
    charge: {type: Number},
    comment: {type: String}, // 숙소에 대한 설명
    createdAt: {type: Date, default: Date.now},
    read: {type: Number, default: 0}

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Room = mongoose.model('Room', schema);

module.exports = Room;