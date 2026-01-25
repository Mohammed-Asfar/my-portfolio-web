import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";

export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const COLLECTION_NAME = "projects";

// Get all projects (ordered by order field)
export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

// Get a single project
export async function getProject(id: string): Promise<Project | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }
  return null;
}

// Add a new project
export async function addProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...project,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update a project
export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...project,
    updatedAt: serverTimestamp(),
  });
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

// Upload image to Firebase Storage
export async function uploadProjectImage(file: File): Promise<string> {
  const fileName = `projects/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

// Delete image from Firebase Storage
export async function deleteProjectImage(imageUrl: string): Promise<void> {
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
