import BookMark from "../models/BookMark.js";

export const BookMarkController = async (req, res) => {
  try {
    const { url, title } = req.body;

    if (!url || !title) {
      return res.status(400).json({
        success: false,
        message: "URL and Title are required",
      });
    }

    const bookmark = await BookMark.create({
      url,
      title,
      user: req.user._id, // from protect middleware
    });

    return res.status(201).json({
      success: true,
      message: "Bookmark created successfully",
      bookmark,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const GetBookMark = async (req, res) => {
  try {
    const bookmark = await BookMark.find({
      user: req.user._id,
    }).sort({ createdAT: -1 });

    return res.status(200).json({
      success: true,
      message: "book bark find sucessfully",
      bookmark,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const DeleteBookMark = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find bookmark first
    const bookmark = await BookMark.findById(id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    // 2️⃣ Check ownership
    if (!bookmark.user) {
      return res.status(400).json({
        success: false,
        message: "Bookmark has no user assigned",
      });
    }

    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to delete this bookmark",
      });
    }

    // 3️⃣ Delete after check
    await bookmark.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const UpdateBookMark = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, title } = req.body;

    const bookmark = await BookMark.findById(id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to update this bookmark",
      });
    }

    bookmark.url = url || bookmark.url;
    bookmark.title = title || bookmark.title;

    await bookmark.save();

    return res.status(200).json({
      success: true,
      message: "Bookmark updated successfully",
      bookmark,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



