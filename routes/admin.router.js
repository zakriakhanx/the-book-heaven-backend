import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { showPendingBooks, approveBook, denyBook } from "../controllers/admin.controller.js";

const adminRouter = Router();


adminRouter.get("/admin/books", requireAuth, requireAdmin, showPendingBooks);
adminRouter.post("/admin/books/:bookId/approve", requireAuth, requireAdmin, approveBook);
adminRouter.post("/admin/books/:bookId/deny", requireAuth, requireAdmin, denyBook);

export default adminRouter;

