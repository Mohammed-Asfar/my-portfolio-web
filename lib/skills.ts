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

export interface Skill {
  id?: string;
  name: string;
  level: number; // 0 - 100
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TechTag {
  id?: string;
  name: string;
  order: number;
  createdAt?: Timestamp;
}

const SKILLS_COLLECTION = "skills";
const TECH_COLLECTION = "techTags";

// ----- Skills (with percentage) -----

// Get all skills (ordered by order field)
export async function getSkills(): Promise<Skill[]> {
  const q = query(collection(db, SKILLS_COLLECTION), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Skill[];
}

// Add a new skill
export async function addSkill(
  skill: Omit<Skill, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, SKILLS_COLLECTION), {
    ...skill,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update a skill
export async function updateSkill(
  id: string,
  skill: Partial<Omit<Skill, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, SKILLS_COLLECTION, id);
  await updateDoc(docRef, {
    ...skill,
    updatedAt: serverTimestamp(),
  });
}

// Delete a skill
export async function deleteSkill(id: string): Promise<void> {
  const docRef = doc(db, SKILLS_COLLECTION, id);
  await deleteDoc(docRef);
}

// ----- Additional Tech tags -----

// Get all tech tags (ordered by order field)
export async function getTechTags(): Promise<TechTag[]> {
  const q = query(collection(db, TECH_COLLECTION), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TechTag[];
}

// Add a new tech tag
export async function addTechTag(
  tag: Omit<TechTag, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, TECH_COLLECTION), {
    ...tag,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Delete a tech tag
export async function deleteTechTag(id: string): Promise<void> {
  const docRef = doc(db, TECH_COLLECTION, id);
  await deleteDoc(docRef);
}
