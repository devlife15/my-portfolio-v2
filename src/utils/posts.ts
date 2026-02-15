import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Define where your MDX files are located
const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string; // Just string! MDXRemote handles the parsing.
  excerpt?: string;
  image?: string;
  author?: string;
}

// 1. Get all slugs (for generating static paths)
export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

// 2. Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter parses the YAML frontmatter
    const { data, content } = matter(fileContents);

    // reading-time calculates stats
    const stats = readingTime(content);

    return {
      slug,
      title: data.title,
      date: data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString(),
      readTime: stats.text,
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      image: data.image || null,
      author: data.author || "Ayan Kumar",
      content: content, // Return raw content for MDXRemote
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// 3. Get all posts sorted by date (for the blog list page)
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null) // Type guard to remove nulls
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

// 4. Get recent posts (for homepage)
export function getRecentPosts(limit: number = 3): Post[] {
  return getAllPosts().slice(0, limit);
}
