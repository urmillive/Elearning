const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) =>
{
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if a token was provided
    if (!token)
    {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    jwt.verify(token, secret, (err, decoded) =>
    {
        if (err)
        {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Check if the user is an admin
        if (decoded.role !== "admin")
        {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Attach the decoded user data to the request object
        req.user = decoded;
        next();
    });
};
