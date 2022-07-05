const mongoose = require("mongoose");

const jwtSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a text"],
    },
    // token: {
    //   type: String,
    //   required: [false],
    // },
    meetingLink:{
        type:String,
        required:[false]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jwtModel", jwtSchema);
