"use client";

import Image from "next/image";
import { Project } from "@/lib/projects";
import { GitHubIcon, ExternalLinkIcon } from "@/app/icons";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass-card glass-card-hover overflow-hidden cursor-pointer group">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder-project.png"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay with links (Desktop) */}
        <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-surface hover:bg-accent text-text transition-colors duration-200"
              aria-label="View on GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubIcon className="w-6 h-6" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-surface hover:bg-accent text-text transition-colors duration-200"
              aria-label="View Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon className="w-6 h-6" />
            </a>
          )}
        </div>
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-space-grotesk)]">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-surface text-xs rounded-md text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-surface text-xs rounded-md text-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Mobile Links (Visible below content) */}
        <div className="flex md:hidden gap-3 mt-4 pt-4 border-t border-border/50">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubIcon className="w-5 h-5" />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
