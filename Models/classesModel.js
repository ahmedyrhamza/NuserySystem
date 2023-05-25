const mongoose = require('mongoose');
const { AutoIncrementID } = require("@typegoose/auto-increment");

const schema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
    children: [{ type: Number, ref: "children" }]
});

schema.plugin(AutoIncrementID,{ incrementBy: 1, startAt: 1  });

mongoose.model("classes", schema);