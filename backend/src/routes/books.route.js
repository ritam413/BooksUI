import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadBook, getAllBooks , updateBookState } from "../controllers/book.controller.js";
import app from '../app.js'
const router = Router()
router.post(
  "/upload",
  (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
      upload.single("image")(req, res, function (err) {
        if (err) return next(err);
        next();
      });
    } else {
      next();
    }
  },
  asyncHandler(uploadBook)
);
router.get(
    "/files",
    asyncHandler(getAllBooks)
)

// PATCH /api/v1/books/:id
router.patch(
  '/:id',updateBookState);

export default router