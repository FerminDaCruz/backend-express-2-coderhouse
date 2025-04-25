export const authorizeCartOwner = () => {
    return async (req, res, next) => {
        const user = req.user;
        const cartId = req.params.cid;

        if (user.cart?.toString() !== cartId) {
            return res.sendForbidden("You are not allowed to modify this cart");
        }
        next();
    };
};
