import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Icon is stored as a string key and mapped to a component on render.
export type ServiceIcon = "code" | "smartphone" | "globe" | "server";

export const SERVICE_ICONS: { value: ServiceIcon; label: string }[] = [
  { value: "smartphone", label: "Smartphone (Mobile)" },
  { value: "globe", label: "Globe (Web)" },
  { value: "server", label: "Server (Backend)" },
  { value: "code", label: "Code (Generic)" },
];

export interface Service {
  id?: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  technologies: string[];
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const COLLECTION_NAME = "services";

// Get all services (ordered by order field)
export async function getServices(): Promise<Service[]> {
  const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Service[];
}

// Add a new service
export async function addService(
  service: Omit<Service, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...service,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update a service
export async function updateService(
  id: string,
  service: Partial<Omit<Service, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...service,
    updatedAt: serverTimestamp(),
  });
}

// Delete a service
export async function deleteService(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
