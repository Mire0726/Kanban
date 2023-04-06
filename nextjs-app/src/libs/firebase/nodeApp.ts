import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID as string;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL as string;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY as string;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const fieldPath = admin.firestore.FieldPath;
const fieldValue = admin.firestore.FieldValue;

export { db, auth, storage, fieldPath, fieldValue };
