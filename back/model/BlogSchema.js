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
    },
    descriptionTitle: {
      type: String,
      default: "",
    },
    descriptionImg: {
      type: Array,
      default: [],
    },
    description: {
      type: Array,
      default: [],
    },
    Name: {
      type: String,
      default: "",
    },
    links: {
      type: Array,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BlogSchema", BlogSchema);
