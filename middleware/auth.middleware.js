import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authorize = async (req, res, next) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user;

        next();

        } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

// Middleware to authorize user roles
export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        authorize(req, res, (authError) => {
            if (authError) {
                return authError;
            }

            if (req.user && req.user.role) {
                if (allowedRoles.includes(req.user.role)) { 
                    return next();
                } else {
                    return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
                }
            } else {
                return res.status(401).json({ message: "User role not found in token" });
            }
        });
    };
};
