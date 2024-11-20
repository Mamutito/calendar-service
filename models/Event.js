const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: [true, "Start date is required"],
  },
  end: {
    type: Date,
    required: [true, "End date is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

EventSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Event", EventSchema);
