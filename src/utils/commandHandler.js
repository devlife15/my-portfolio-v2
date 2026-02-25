import { commands } from "../data/commands";
import { blogArticles } from "../data/blogPublished";
import { codingQuotes } from "../data/codingQuotes";

export const commandHandlers = {
  help: () => [
    { text: "Available commands:", type: "system-header" },
    { text: "  whoami       - Display current user profile", type: "system" },
    {
      text: "  projects     - List active directories and projects",
      type: "system",
    },
    {
      text: "  stack        - Output technical dependencies (JSON)",
      type: "system",
    },
    {
      text: "  status       - Print current system objectives",
      type: "system",
    },
    { text: "  blogs        - Access published archive logs", type: "system" },
    { text: "  sudo         - Execute command as superuser", type: "system" },
    { text: "  clear        - Clear terminal output", type: "system" },
  ],

  whoami: () => [
    { text: "user@ayan-mainframe", type: "system-header" },
    {
      text: "Role     : Full-Stack Engineer & Computer Science Graduate",
      type: "system",
    },
    { text: "Location : Purulia, West Bengal", type: "system" },
    {
      text: "Status   : Actively building scalable web systems.",
      type: "system",
    },
  ],

  projects: () => [
    { text: "Directory listing for ./projects:", type: "system-header" },
    {
      text: "drwxr-xr-x  [ACTIVE]  SCM_HRMS_System      (Next.js, Node.js, PostgreSQL)",
      type: "system",
    },
    {
      text: "drwxr-xr-x  [BUILD]   Concept_Builder_App  (Mobile App Ideation)",
      type: "system",
    },
    {
      text: "drwxr-xr-x  [SYSTEM]  Glass_HUD_Portfolio  (React, Framer Motion)",
      type: "system",
    },
  ],

  stack: () => [
    { text: "cat tech_stack.json", type: "system-header" },
    { text: "{", type: "system" },
    {
      text: '  "core": ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],',
      type: "system",
    },
    {
      text: '  "fundamentals": ["Data Structures", "Algorithms", "System Design"],',
      type: "system",
    },
    {
      text: '  "languages": ["JavaScript", "TypeScript", "Java"]',
      type: "system",
    },
    { text: "}", type: "system" },
  ],

  status: () => [
    { text: "SYSTEM STATUS: ONLINE", type: "system-header" },
    { text: `Uptime: ${new Date().toLocaleDateString()}`, type: "system" },
    {
      text: "Current Process: Mastering System Design and Advanced DSA.",
      type: "system",
    },
    {
      text: "Target Objective: Secure Software Engineering role by May 2026.",
      type: "system",
    },
  ],

  sudo: () => [
    {
      text: "user is not in the sudoers file. This incident will be reported.",
      type: "system-error",
    },
  ],

  blogs: () => {
    const output = [
      { text: "Archive Logs:", type: "system-header" },
      { text: "Click on any entry to access the file:", type: "system" },
      { text: "", type: "system" },
    ];
    blogArticles.forEach((article, index) => {
      output.push({
        text: `  [${(index + 1).toString().padStart(2, "0")}] ${article.title}`,
        type: "blog-clickable",
        url: article.url,
      });
    });
    return output;
  },

  clear: (_, { setCommandHistory }) => {
    setCommandHistory([]);
    return null; // Prevents the executor from pushing an empty array
  },
};
