import mongoose from "mongoose";

const clothesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    imageList: {
      type: Array,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    numReviews: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Clothe = mongoose.model("Clothe", clothesSchema);
export default Clothe;
