import { getAuth, clerkClient } from "@clerk/express";

// Derive the authenticated Clerk user's id and display name from the session.
// Clerk user IDs are strings (e.g. "user_xxx"), not MongoDB ObjectIds.
export const getClerkIdentity = async (req) => {
  const { userId, sessionClaims } = getAuth(req);

  const user = await clerkClient.users.getUser(userId);
  const userName = user.username;
  const role = sessionClaims?.metadata?.role ?? user.publicMetadata?.role;

  console.log(`from auth middleware ${userName}`)
  
  return { userId, role, userName };
};

// Helper middleware to strictly enforce admin access
export const requireAdmin = async (req, res, next) => {
  try {
    const { userId, sessionClaims } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let role = sessionClaims?.metadata?.role;

    if (role !== "admin") {
      const user = await clerkClient.users.getUser(userId);
      role = user.publicMetadata?.role;
    }

    if (role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required." });
    }

    next();
  } catch (error) {
    console.error("Error verifying admin access:", error);
    res.status(500).json({ error: "Error verifying admin access" });
  }
};

export const requireAuth = (req, res, next) => {
  const { isAuthenticated } = getAuth(req);

  if (!isAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};