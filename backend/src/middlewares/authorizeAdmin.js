export const authorizeAdmin = () => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.sendUnauthorized();
        }

        if (user.role !== "admin") {
            return res.sendForbidden("Forbidden: insufficient permissions");
        }
        next();
    };
};
