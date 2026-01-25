import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Timestamp;
}

const COLLECTION_NAME = "messages";

// Get all messages (ordered by newest first)
export async function getMessages(): Promise<Message[]> {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Message[];
}

// Add a new message
export async function addMessage(
  msg: Omit<Message, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...msg,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Delete a message
export async function deleteMessage(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
