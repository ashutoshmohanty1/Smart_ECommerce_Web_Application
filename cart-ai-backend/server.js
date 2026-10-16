const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* REGISTER */
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            return res.json({ message: "User already exists or DB error" });
        }
        res.json({ message: "Registration successful" });
    });
});

/* LOGIN */
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.json({ message: "Server error" });
        }
        if (result.length > 0) {
            const user = result[0];
            res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        } else {
            res.json({ message: "Invalid credentials" });
        }
    });
});

app.post("/add-to-cart", (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
    db.query(sql, [user_id, product_id, quantity], (err) => {
        if (err) return res.json({ message: "Error adding to cart" });
        res.json({ message: "Added to cart" });
    });
});

/* GET PRODUCTS */
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ message: "Error fetching products" });
        }
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});