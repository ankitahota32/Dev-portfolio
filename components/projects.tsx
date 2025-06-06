"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ExternalLink, Github } from "lucide-react"
import Image from 'next/image'

const projects = [
  {
    title: "True-you",
    description:
      "True-you is a blog app made with MERN stack featuring user authentication. Here you can create you own post in see it in your own profile.",
    technologies: [
      "React.js",
      "Node.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
    ],
    image: "/Screenshot (176).png",
    github:
      "https://github.com/ankitahota32/Blog-app-frontend/blob/master/src/App.tsx",
    live: "https://true-you.netlify.app/",
  },

  {
    title: "Taskify-planner",
    description:
      "Taskify-planner is a task management app that implements CRUD operations. It features user authentication.",
    technologies: [
      "React.js",
      "Node.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
    ],
    image: "/Screenshot (178).png",
    github: "https://github.com/ankitahota32/Task-Planner-frontend",
    live: "https://taskify-planner.netlify.app/",
  },

  {
    title: "Signature App",
    description:
      "Signature app is made using HTML, CSS and JavaScript. Here you can pick your text size and background color as well as you can download it.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/Screenshot (177).png",
    github: "https://github.com/ankitahota32/Signature-Web",
    live: "https://starlit-kheer-39fb32.netlify.app/",
  },
];

export default function Projects() {
    const projectsRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".project-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: ".projects-grid",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions:"play none none reverse",
                    },
                },
            )
        }, projectsRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" ref={projectsRef} className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                       Featured <span className="text-blue-400">Projects</span>
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">A showcase of my recent work and personal projects</p>
                </div>

                <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index}
                            className="project-card bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-300 group">
                            <div className="relative overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    width={400}
                                     height={400}/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent " />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                                <p className="text-white/70 mb-4 text-sm leading-relaxed">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="px-3 py-1 bg-blue-400/20 text-blue-300 rounded-full text-xs">
                                        {tech}
                                    </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <a href={project.github}
                                        className="flex items-center gap-2 text-white/80 hover:text-white transition-color">
                                        <Github size={16} />
                                        <span className="text-sm">Code</span>
                                    </a>
                                    <a href={project.live}
                                        className="flex items-center gap-2 text-blue-300 transition-colors">
                                        <ExternalLink size={16} />
                                        <span className="text-sm">Live Demo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}