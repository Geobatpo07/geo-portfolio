import fs from "fs"
import path from "path"
import matter from "gray-matter"

const root = process.cwd()

export async function getFiles(type: string) {
    const dir = path.join(root, "src", "content", type)
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
}

export async function getFileBySlug(type: string, slug: string) {
    const source = fs.readFileSync(
        path.join(root, "src", "content", type, `${slug}.mdx`),
        "utf8"
    )

    const { data, content } = matter(source)

    return {
        frontMatter: data,
        content,
        slug,
    }
}

export async function getAllFilesFrontMatter(type: string) {
    const dir = path.join(root, "src", "content", type)
    if (!fs.existsSync(dir)) return []

    const files = fs.readdirSync(dir)

    return files.reduce((allPosts: Array<{ slug: string;[key: string]: unknown }>, postSlug) => {
        const source = fs.readFileSync(
            path.join(root, "src", "content", type, postSlug),
            "utf8"
        )
        const { data } = matter(source)

        return [
            {
                ...data,
                slug: postSlug.replace(".mdx", ""),
            },
            ...allPosts,
        ]
    }, [])
}
