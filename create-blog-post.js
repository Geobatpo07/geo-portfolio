// Script to create blog post via Convex API
const { ConvexHttpClient } = require("convex/browser");

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const token = process.argv[2];

if (!token) {
    console.error("Please provide admin token as argument");
    process.exit(1);
}

const blogPost = {
    title: "Building a Modern Portfolio: Innovations and Future Potential",
    slug: "building-a-modern-portfolio-innovations-and-future-potential",
    description: "A deep dive into the realization of this portfolio, the technologies used, and the future potential of the project.",
    content: `Welcome to my new portfolio! This project represents a journey into modern web development, leveraging cutting-edge technologies to create a fast, dynamic, and interactive user experience.

### The Tech Stack
At the core of this portfolio is **Next.js**, providing a robust framework for server-side rendering and static site generation. For the backend, I chose **Convex**, a real-time database that simplifies data synchronization and state management. Styling is handled by **Tailwind CSS**, allowing for rapid and consistent UI development.

### Innovations
One of the key innovations in this project is the use of **Convex** for real-time updates. Unlike traditional REST APIs, Convex allows the frontend to subscribe to data changes, ensuring that the UI is always in sync with the backend without manual refreshing. This is particularly useful for features like the blog and admin dashboard.

Another exciting aspect is the integration of AI-assisted coding tools, which accelerated the development process and helped solve complex logic challenges efficiently.

### Future Potential
This portfolio is just the beginning. I plan to expand it with:
- **Interactive Data Visualizations**: Showcasing my data analytics skills with D3.js or Recharts.
- **Enhanced Blog Features**: Adding comments, likes, and social sharing.
- **More AI Integrations**: Exploring how AI can further enhance the user experience.

Stay tuned for more updates!`,
    cover_image: "",
    status: "published",
    token: token
};

async function createPost() {
    try {
        const result = await client.mutation("blog:createPost", blogPost);
        console.log("Blog post created successfully!");
        console.log("Post ID:", result);
    } catch (error) {
        console.error("Error creating blog post:", error);
        process.exit(1);
    }
}

createPost();
