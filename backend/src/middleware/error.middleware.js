export function errorMiddleware(err, req, res, next) {

    console.error("Error:", err);
  
    if (err.code === "P2002") {
      return res.status(400).json({
        message: "Duplicate value already exists"
      });
    }
  
    const status = err.statusCode || 500;
  
    res.status(status).json({
      message: err.message || "Internal Server Error"
    });
  }