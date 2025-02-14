import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });
}

const db = getFirestore();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { username, password } = req.body;

    try {
        const userDoc = await db.collection("users").doc(username).get();

        if (!userDoc.exists) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const userData = userDoc.data();

        if (userData.password === password) {
            return res.status(200).json({ message: "Login successful!" });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
