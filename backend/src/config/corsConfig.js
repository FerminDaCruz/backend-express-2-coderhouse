const allowedOrigins = [
    "http://localhost:5173", // frontend Vite
    "http://localhost:3000", // otro frontend
    undefined, // Postman, curl, etc.
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true, // permite cookies
};
