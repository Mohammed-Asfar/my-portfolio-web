"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  Project,
} from "@/lib/projects";
import { getMessages, deleteMessage, Message } from "@/lib/messages";

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [prdText, setPrdText] = useState("");
  const [extracting, setExtracting] = useState(false);

  useEffect(() => {
    // Try to load API key from local storage
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleExtract = async () => {
    if (!prdText) return alert("Please enter some text to extract.");
    
    setExtracting(true);
    try {
      if (apiKey) localStorage.setItem("gemini_api_key", apiKey);

      const response = await fetch("/api/extract-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prdText, apiKey }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
      if (data.technologies) setTechnologies(data.technologies.join(", "));
      if (data.githubUrl) setGithubUrl(data.githubUrl);
      if (data.liveUrl) setLiveUrl(data.liveUrl);
      
    } catch (error: any) {
      console.error("Extraction error:", error);
      alert(error.message || "Failed to extract details. Check your API key.");
    } finally {
      setExtracting(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [projectsData, messagesData] = await Promise.all([
        getProjects(),
        getMessages(),
      ]);
      setProjects(projectsData);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteMessage(id);
      await loadMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/admin");
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setGithubUrl("");
    setLiveUrl("");
    setTechnologies("");
    setFeatured(false);
    setOrder(projects.length);
    setImageFile(null);
    setImagePreview("");
    setEditingProject(null);
  };

  const openAddForm = () => {
    resetForm();
    setOrder(projects.length);
    setShowForm(true);
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setGithubUrl(project.githubUrl || "");
    setLiveUrl(project.liveUrl || "");
    setTechnologies(project.technologies.join(", "));
    setFeatured(project.featured);
    setOrder(project.order);
    setImagePreview(project.imageUrl);
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = editingProject?.imageUrl || "";

      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile);
      }

      const projectData = {
        title,
        description,
        imageUrl,
        technologies: technologies.split(",").map((t) => t.trim()).filter(Boolean),
        featured,
        order,
        ...(githubUrl ? { githubUrl } : {}),
        ...(liveUrl ? { liveUrl } : {}),
      };

      if (editingProject?.id) {
        await updateProject(editingProject.id, projectData);
      } else {
        await addProject(projectData);
      }

      await loadProjects();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project. Make sure Storage is enabled in Firebase.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      await loadProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-sm hidden sm:inline">{user.email}</span>
            <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Actions */}
          {/* Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab("projects")}
                className={`text-2xl font-bold font-[family-name:var(--font-space-grotesk)] transition-colors ${
                  activeTab === "projects" ? "text-text" : "text-text-muted hover:text-text"
                }`}
              >
                Projects ({projects.length})
              </button>
              <span className="text-2xl text-text-muted">/</span>
              <button
                onClick={() => setActiveTab("messages")}
                className={`text-2xl font-bold font-[family-name:var(--font-space-grotesk)] transition-colors ${
                  activeTab === "messages" ? "text-text" : "text-text-muted hover:text-text"
                }`}
              >
                Messages ({messages.length})
              </button>
            </div>
            
            {activeTab === "projects" && (
              <button onClick={openAddForm} className="btn-primary">
                + Add Project
              </button>
            )}
          </div>

          {/* Project Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="glass-card w-full max-w-5xl p-6 my-8">
                <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column: AI & Content */}
                  <div className="space-y-6">
                    {/* AI Auto-Fill Section */}
                    <div className="p-4 bg-surface/50 rounded-lg border border-border">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        ✨ AI Auto-Fill
                        <span className="text-xs font-normal text-text-muted bg-surface px-2 py-0.5 rounded">Gemini</span>
                      </h4>
                      
                      <div className="space-y-3">
                        {!process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
                          <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Paste Gemini API Key (optional if set on server)"
                            className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-accent"
                          />
                        )}
                        
                        <textarea
                          value={prdText}
                          onChange={(e) => setPrdText(e.target.value)}
                          placeholder="Paste PRD or project description here..."
                          rows={4}
                          className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:border-accent resize-none"
                        />
                        
                        <button
                          type="button"
                          onClick={handleExtract}
                          disabled={extracting || !prdText}
                          className="btn-secondary text-sm w-full py-2"
                        >
                          {extracting ? "Extracting..." : "Auto-Fill Details"}
                        </button>
                      </div>
                    </div>

                    {/* Description (moved to left column) */}
                    <div>
                      <label className="block text-sm text-text-muted mb-2">Description *</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={12}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-accent resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column: Form Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm text-text-muted mb-2">Title *</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm text-text-muted mb-2">Order</label>
                        <input
                          type="number"
                          value={order}
                          onChange={(e) => setOrder(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-text-muted mb-2">Project Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-accent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white file:cursor-pointer"
                      />
                      {imagePreview && (
                        <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden border border-border">
                          <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm text-text-muted mb-2">GitHub URL</label>
                        <input
                          type="url"
                          value={githubUrl}
                          onChange={(e) => setGithubUrl(e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                          placeholder="https://github.com/..."
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm text-text-muted mb-2">Live URL</label>
                        <input
                          type="url"
                          value={liveUrl}
                          onChange={(e) => setLiveUrl(e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-text-muted mb-2">
                        Technologies (comma separated) *
                      </label>
                      <input
                        type="text"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-accent"
                        placeholder="Flutter, Firebase, Dart"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-5 h-5 rounded border-border bg-surface accent-accent"
                      />
                      <label htmlFor="featured" className="text-sm text-text-muted">
                        Featured Project
                      </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-border mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          resetForm();
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn-primary">
                        {saving ? "Saving..." : editingProject ? "Update" : "Add Project"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          )}

          {/* Projects Empty State */}
          {!loading && activeTab === "projects" && projects.length === 0 && (
            <div className="glass-card p-12 text-center">
              <p className="text-text-muted mb-4">No projects yet</p>
              <button onClick={openAddForm} className="btn-primary">
                Add Your First Project
              </button>
            </div>
          )}
          
          {/* Projects List */}
          {!loading && activeTab === "projects" && projects.length > 0 && (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card p-0 flex flex-col md:flex-row overflow-hidden group"
                >
                  <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 bg-surface">
                    <Image
                      src={project.imageUrl || "/placeholder-project.png"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded-full border border-accent/20">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span key={tech} className="text-xs text-text-muted bg-surface/50 px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-text-muted text-sm line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                      <button
                        onClick={() => openEditForm(project)}
                        className="px-4 py-2 bg-surface hover:bg-surface-hover text-sm font-medium rounded-lg transition-colors flex-1 md:flex-none text-center"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={() => project.id && handleDelete(project.id)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium rounded-lg transition-colors flex-1 md:flex-none text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Messages List */}
          {!loading && activeTab === "messages" && messages.length === 0 && (
            <div className="glass-card p-12 text-center">
              <p className="text-text-muted mb-4">No messages yet</p>
            </div>
          )}

          {!loading && activeTab === "messages" && messages.length > 0 && (
            <div className="grid gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="glass-card p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-space-grotesk)]">
                        {msg.name}
                      </h3>
                      <a href={`mailto:${msg.email}`} className="text-accent hover:underline text-sm">
                        {msg.email}
                      </a>
                    </div>
                    <div className="text-sm text-text-muted">
                      {msg.createdAt?.toDate().toLocaleDateString() || "Just now"}
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-lg border border-border/50 text-text-muted text-sm whitespace-pre-wrap">
                    {msg.message}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => msg.id && handleDeleteMessage(msg.id)}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium rounded-lg transition-colors"
                    >
                      Delete Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
