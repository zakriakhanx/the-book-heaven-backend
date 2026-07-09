import { getAuth } from "@clerk/express";

// Helper middleware to strictly enforce admin access
export const requireAdmin = (req, res, next) => {
  const sessionClaims = req.auth?.sessionClaims;
  const role = sessionClaims?.metadata?.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin access required." });
  }
  next();
};

export const requireAuth = (req, res, next) => {
  const { isAuthenticated } = getAuth(req);

  if (!isAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};