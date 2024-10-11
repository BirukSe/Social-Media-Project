import express from "express";
import bodyparser from "body-parser";
import pg from "pg";
const app=express();
const port=4000;
const db =new pg.Client({
    user: "birukee",
    host: "localhost",
    database: "blog",
    password: "new_password",
    port: 5432
})
db.connect();
app.use(bodyparser.urlencoded({extended: true}));
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );
        const user = result.rows[0];
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: "User creation failed" });
    }
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate a token (you might want to customize the payload and secret)
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: "Login failed" });
    }
});
app.listen(port, ()=>{
    console.log(`Backend listening on port http://localhost:${port}`);
})