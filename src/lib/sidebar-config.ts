import {
    LayoutDashboard,
    FolderKanban,
    Award,
    BarChart3,
    BookOpen,
    FileText,
    Github,
    Linkedin,
    type LucideIcon,
} from "lucide-react"

export interface SidebarLink {
    name: string
    href: string
    icon: LucideIcon
    external?: boolean
}

export interface SidebarGroup {
    title: string
    links: SidebarLink[]
}

export const sidebarConfig: SidebarGroup[] = [
    {
        title: "Projects",
        links: [
            {
                name: "All Projects",
                href: "/projects",
                icon: FolderKanban,
            },
            {
                name: "Case Studies",
                href: "/case-studies",
                icon: LayoutDashboard,
            },
            {
                name: "Skills",
                href: "/skills",
                icon: Award,
            },
            {
                name: "Visualizations",
                href: "/visualizations",
                icon: BarChart3,
            },
        ],
    },
    {
        title: "Resources",
        links: [
            {
                name: "Blog",
                href: "/blog",
                icon: BookOpen,
            },
            {
                name: "Certificates",
                href: "/certificates",
                icon: FileText,
            },
        ],
    },
    {
        title: "Social",
        links: [
            {
                name: "GitHub",
                href: "https://github.com/geobatpo07",
                icon: Github,
                external: true,
            },
            {
                name: "LinkedIn",
                href: "https://linkedin.com/in/geobatpo07",
                icon: Linkedin,
                external: true,
            },
            {
                name: "Kaggle",
                href: "https://kaggle.com/geobatpo07",
                icon: BarChart3,
                external: true,
            },
            {
                name: "Download CV",
                href: "/cv.pdf",
                icon: FileText,
                external: true,
            },
        ],
    },
]
