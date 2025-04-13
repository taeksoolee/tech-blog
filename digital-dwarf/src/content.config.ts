import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	// Transform string to Date object
	pubDate: z.coerce.date(),
	updatedDates: z.array(z.coerce.date()).optional(),
	heroImage: z.string().optional(),
});

const createCollection = (category?: string) => {
	const base = category ? `./src/content/blog/${category}` : "./src/content/blog";
	const loader = glob({ base, pattern: "**/*.{md,mdx}", });
	return defineCollection({
		// Load Markdown and MDX files in the `src/content/blog/` directory.
		loader,
		// Type-check frontmatter using a schema
		// schema: blogSchema.extend({}),
		schema: blogSchema
	})
}

export const collections = { 
	['blog.all']: createCollection(),
	['blog.tech']: createCollection("tech"),
	['blog.life']: createCollection("life"),
};
