import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      default: [],
      required: true,
    },
    descriptionTitle: {
      type: String,
      default: "",
      required: true,
    },
    descriptionImg: {
      type: Array,
      default: [],
    },
    description: {
      type: Array,
      default: [],
      required: true,
    },
    Name: {
      type: String,
      default: "",
      required: true,
    },
    links: {
      type: Array,
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BlogSchema", BlogSchema);
