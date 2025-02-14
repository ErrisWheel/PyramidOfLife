export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, password } = req.body;
      
        const users = [{ username: "test", password: "1234" }];

        const userExists = users.find(
            (user) => user.username === username && user.password === password
        );

        if (userExists) {
            res.status(200).json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
