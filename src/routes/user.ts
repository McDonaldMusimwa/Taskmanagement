const route = require('express').Router();

route.get('/', (req, res, next) => {
    res.json({message:"we are connected"}); // Use res.send() to send a response
    // Or use res.json() if you want to send JSON data: res.json({ message: "we are connected" });
    // Next middleware or route handler should be called using next()
});

module.exports = route;
