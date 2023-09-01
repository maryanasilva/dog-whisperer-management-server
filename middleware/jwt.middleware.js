const { expressjwt: jwt } = require("express-jwt");

/* // Middleware to check if the user is a kennel manager
const isKennelManager = (req, res, next) => {
  if (req.payload.isKennelManager) {
    next(); // User is a kennel manager, proceed to the next middleware
  } else {
    res.status(403).json({ message: "Access denied. Kennel managers only." });
  }
}; */

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
/*   isKennelManager, */
};
