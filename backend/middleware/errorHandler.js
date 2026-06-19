function errorHandler(error, req, res, next) {
    console.error(error);

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Something went wrong on the server."
    });
}

module.exports = errorHandler;
