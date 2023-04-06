import { db } from "@/libs/firebase/clientApp";
import { doc, collection } from "firebase/firestore";

/**
 * 20桁のランダムなdocIdを作成する
 * @returns docId
 */
export const createDocId = (): string => {
  const docRef = doc(collection(db, "trigger"));
  return docRef.id;
};
