import admin from "firebase-admin";

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    });
}

const db = admin.firestore();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        try {
            const userDoc = await db.collection("users").doc(username).get();

            if (!userDoc.exists) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const user = userDoc.data();

            if (user.password === password) {
                return res.status(200).json({ message: "Login successful!" });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
