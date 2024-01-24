export const paginatedResults = (model) => async (req, res, next) => {
  try {
    const { page = 1, pageSize = 3 } = req.query;

    const filter = {};
    if (req.query.completed !== undefined) {
      if (req.query.completed !== "true" && req.query.completed !== "false") {
        return res.status(400).json({ message: "Invalid Query" });
      }
      filter.completed = req.query.completed === "true";
    }
    console.log("Filters: ", filter);

    const results = await model
      .find(filter)
      .limit(parseInt(pageSize))
      .skip((parseInt(page) - 1) * parseInt(pageSize));

    res.paginatedResults = results;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Pagination Failed",
      error: error.message,
    });
  }
};
