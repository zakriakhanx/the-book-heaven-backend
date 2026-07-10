import { getAuth, clerkClient } from "@clerk/express";

// Derive the authenticated Clerk user's id and display name from the session.
// Clerk user IDs are strings (e.g. "user_xxx"), not MongoDB ObjectIds.
export const getClerkIdentity = (req) => {
  const { userId, sessionClaims } = getAuth(req);

  const role = sessionClaims?.metadata?.role;

  return { userId, role };
};

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