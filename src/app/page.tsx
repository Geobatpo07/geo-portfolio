"use client"

import { HeroSection } from "@/components/shared/HeroSection"
import { ProjectCard } from "@/components/shared/ProjectCard"
import { SkillBadge } from "@/components/shared/SkillBadge"
import { Button } from "@/components/ui/button"
import { projects, skills, blogPosts } from "@/lib/data"
import Link from "next/link"
import { ArrowRight, Code2, Database, Cloud, Wrench, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const skillIcons = {
  programming: Code2,
  ml_dl: Brain,
  data: Database,
  cloud: Cloud,
  tools: Wrench,
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-16">
      <HeroSection />

      {/* Featured Projects Section */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                Explore my latest work in data science and engineering
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" asChild className="hover-lift group">
              <Link href="/projects" className="flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Technologies and tools I work with daily
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, skillList], index) => {
              const Icon = skillIcons[category as keyof typeof skillIcons]
              const categoryName = category.replace('_', ' / ').toUpperCase()

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift border-2 hover:border-primary/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold">{categoryName}</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill: string) => (
                          <SkillBadge key={skill} name={skill} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Latest <span className="gradient-text">Insights</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                Thoughts and tutorials on data engineering and MLOps
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift border-2 hover:border-primary/30 transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.description}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:underline inline-flex items-center gap-1 font-medium group/link"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" asChild className="hover-lift group">
              <Link href="/blog" className="flex items-center gap-2">
                View All Posts
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
