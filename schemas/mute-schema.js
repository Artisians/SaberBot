const mongoose = require("mongoose");

const muteSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    guildID: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    staffID: {
      type: String,
      required: true,
    },
    staffTag: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mute", muteSchema);
