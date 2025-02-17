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
    if (req.method === "POST") {
        const { username, password, email } = req.body;

        try {
            const userDoc = await db.collection("users").doc(username).get();

            if (userDoc.exists) {
                return res.status(400).json({ message: "User already exists" });
            }

            await db.collection("users").doc(username).set({
                password,
                email,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            return res.status(201).json({ message: "User registered successfully!" });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
