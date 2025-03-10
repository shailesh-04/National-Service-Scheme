import Router from "express";
import StorageController from "#controllers/storage.controller.js";

const router = Router();

// Create a new storage entry
router.post("/", StorageController.create);

// Get all storage entries
router.get("/", StorageController.getAll);

router.get("/whyuse/image-gallery",StorageController.getImageGallery);
router.put("/whyuse/image-gallery",StorageController.UpdateImageGallery);

router.get("/:id", StorageController.getById);

router.put("/:id", StorageController.update);

// Delete a storage entry
router.delete("/:id", StorageController.delete);

export default router;
