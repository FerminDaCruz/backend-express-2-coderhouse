export default (req, res, next) => {
    res.sendSuccess = (payload) => {
        res.status(200).json({ status: "success", data: payload });
    };

    res.sendCreated = (payload) => {
        res.status(201).json({ status: "created", data: payload });
    };

    res.sendNoContent = () => {
        res.status(204).send();
    };

    res.sendClientError = (message = "Bad request") => {
        res.status(400).json({ status: "error", message });
    };

    res.sendUnauthorized = (message = "Unauthorized") => {
        res.status(401).json({ status: "error", message });
    };

    res.sendForbidden = (message = "Forbidden") => {
        res.status(403).json({ status: "error", message });
    };

    res.sendNotFound = (message = "Not found") => {
        res.status(404).json({ status: "error", message });
    };

    res.sendServerError = (error) => {
        res.status(500).json({
            status: "error",
            message: error?.message || "Internal Server Error",
        });
    };

    next();
};
