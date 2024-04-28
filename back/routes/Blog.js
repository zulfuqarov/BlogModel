import express from "express";
import cloudinary from "cloudinary";
import BlogSchema from "../model/BlogSchema.js";

const router = express.Router();

router.post("/BlogPost", async (req, res) => {
  const { title, descriptionTitle, description, Name, links } = req.body;
  let BlogImg =
    req.files && req.files.BlogImg
      ? Array.isArray(req.files.BlogImg)
        ? req.files.BlogImg.map((oneMap) => oneMap.tempFilePath)
        : [req.files.BlogImg.tempFilePath]
      : "No Img";

  let descriptionImg =
    req.files && req.files.descriptionImg
      ? Array.isArray(req.files.descriptionImg)
        ? req.files.descriptionImg.map((oneMap) => oneMap.tempFilePath)
        : [req.files.descriptionImg.tempFilePath]
      : "No Img";
  try {
    if (BlogImg !== "No Img") {
      BlogImg = await Promise.all(
        BlogImg.map(async (oneMap) => {
          return await cloudinary.uploader.upload(oneMap, {
            use_filename: true,
            folder: "Home",
          });
        })
      );
    }

    if (descriptionImg !== "No Img") {
      descriptionImg = await Promise.all(
        descriptionImg.map(async (oneMap) => {
          return await cloudinary.uploader.upload(oneMap, {
            use_filename: true,
            folder: "Home",
          });
        })
      );
    }
    const newBlogSchema = await new BlogSchema({
      title,
      descriptionTitle,
      description,
      Name,
      links,
      img: BlogImg !== "No Img" ? BlogImg : BlogImg,
      descriptionImg:
        descriptionImg !== "No Img" ? descriptionImg : descriptionImg,
    });
    await newBlogSchema.save();
    return res
      .status(200)
      .json({ message: "Blog has been created", newBlogSchema });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/BlogPut/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const BlogPut = await BlogSchema.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // res.status(200).json(BlogPut);
    res.status(200).json({ message: "BlogPut has been updated!", BlogPut });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/BlogDelete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const BlogDelete = await BlogSchema.findByIdAndDelete({
      _id: id,
    });
    if (!BlogDelete) {
      return res.status(404).json({ message: "Blog not found!" });
    }
    res.status(200).json({ message: "Blog has been deleted!", BlogDelete });
  } catch (error) {
    console.log(error);
  }
});

router.post("/BlogSearch", async (req, res) => {
  const { Search } = req.body;

  try {
    const BlogSearch = await BlogSchema.find({
      title: { $regex: new RegExp("\\b" + Search, "i") },
    });
    if (BlogSearch.length > 0) {
      res.status(200).json(BlogSearch);
    } else {
      res
        .status(404)
        .json({ message: "Aranan kategoriye uygun indirim bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/BlogGetAndSearch/:count/:perPage", async (req, res) => {
  const { count, perPage } = req.params;
  const skip = (count - 1) * perPage;
  const { Search } = req.body;

  try {
    let BlogGet;
    if (Search) {
      // Arama yapıldıysa
      BlogGet = await BlogSchema.find({
        title: { $regex: new RegExp("\\b" + Search, "i") },
      });
    } else {
      // Arama yapılmadıysa
      BlogGet = await BlogSchema.find().skip(skip).limit(perPage);
    }

    res.status(200).json(BlogGet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// router.get("/BlogGet/:count/:perPage", async (req, res) => {
//   const { count, perPage } = req.params;
//   const skip = (count - 1) * perPage;
//   try {
//     const BlogGet = await BlogSchema.find().skip(skip).limit(perPage);
//     res.status(200).json(BlogGet);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
export default router;
