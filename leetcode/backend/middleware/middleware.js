import pool from "../DatabaseConnection.js";

export const validateUser = async (req, res, next) => {
    try {
        const username = req.body.username;

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length > 0) {
            return res.status(400).json({
                error: "Username already exists"
            });
        }

        next();

    } catch (err) {
        next(err);
    }
};