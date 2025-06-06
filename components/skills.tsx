"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  Code2,
  Database,
  Server,
  Globe,
  Container,
  Layers,
  Zap,
  GitBranch,
  Sparkles,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const skills = [
  {
    category: "Frontend",
    icon: <Globe className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/30",
    description: "Creating stunning user interfaces",
    technologies: [
      {
        name: "React",
        icon: <Code2 className="w-6 h-6" />,
        color: "text-cyan-400",
        level: 95,
      },
      {
        name: "Next.js",
        icon: <Zap className="w-6 h-6" />,
        color: "text-blue-400",
        level: 90,
      },
      {
        name: "TypeScript",
        icon: <Code2 className="w-6 h-6" />,
        color: "text-blue-300",
        level: 88,
      },
      {
        name: "Tailwind CSS",
        icon: <Layers className="w-6 h-6" />,
        color: "text-cyan-300",
        level: 92,
      },
    ],
  },
  {
    category: "Backend",
    icon: <Server className="w-8 h-8" />,
    color: "from-green-500 to-emerald-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-400/30",
    description: "Building robust server solutions",
    technologies: [
      {
        name: "Node.js",
        icon: <Server className="w-6 h-6" />,
        color: "text-green-400",
        level: 93,
      },
      {
        name: "Nest.js",
        icon: <Server className="w-6 h-6" />,
        color: "text-emerald-400",
        level: 85,
      },
      {
        name: "Express.js",
        icon: <Server className="w-6 h-6" />,
        color: "text-green-300",
        level: 90,
      },
      {
        name: "REST APIs",
        icon: <Globe className="w-6 h-6" />,
        color: "text-emerald-300",
        level: 94,
      },
    ],
  },
  {
    category: "Database",
    icon: <Database className="w-8 h-8" />,
    color: "from-purple-500 to-pink-400",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-400/30",
    description: "Managing data efficiently",
    technologies: [
      {
        name: "MongoDB",
        icon: <Database className="w-6 h-6" />,
        color: "text-purple-400",
        level: 89,
      },
      {
        name: "PostgreSQL",
        icon: <Database className="w-6 h-6" />,
        color: "text-pink-400",
        level: 87,
      },
      {
        name: "Redis",
        icon: <Database className="w-6 h-6" />,
        color: "text-purple-300",
        level: 82,
      },
      {
        name: "Prisma",
        icon: <Database className="w-6 h-6" />,
        color: "text-pink-300",
        level: 86,
      },
    ],
  },
  {
    category: "DevOps",
    icon: <Container className="w-8 h-8" />,
    color: "from-orange-500 to-red-400",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-400/30",
    description: "Streamlining deployment workflows",
    technologies: [
      {
        name: "Docker",
        icon: <Container className="w-6 h-6" />,
        color: "text-orange-400",
        level: 88,
      },
      {
        name: "Git",
        icon: <GitBranch className="w-6 h-6" />,
        color: "text-red-400",
        level: 95,
      },
      {
        name: "AWS",
        icon: <Globe className="w-6 h-6" />,
        color: "text-orange-300",
        level: 83,
      },
      {
        name: "Vercel",
        icon: <Zap className="w-6 h-6" />,
        color: "text-red-300",
        level: 91,
      },
    ],
  },
];

export default function Skills() {
  const skillsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      const titleChars = titleRef.current?.textContent?.split("") || [];
      if (titleRef.current) {
        titleRef.current.innerHTML = titleChars
          .map(
            (char) =>
              `<span class="char" data-char="${char}">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");
      }

      gsap.fromTo(
        ".char",
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            each: 0.03,
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.set(subtitleRef.current, { text: "" });
      gsap.to(subtitleRef.current, {
        text: "Proficient in modern web technologies and frameworks for building scalable applications",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3,
      });

      gsap.fromTo(
        ".skill-card",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".skill-item",
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".progress-bar",
        { width: "0%" },
        {
          width: (i, target) => target.dataset.level + "%",
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".sparkle", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        stagger: 1,
      });

      gsap.utils.toArray(".skill-card").forEach((card, index) => {
        const cardEl = card as HTMLElement
        const light = cardEl.querySelector(".traveling-light");
        const cardWidth = cardEl.offsetWidth;
        const cardHeight = cardEl.offsetHeight;
        const borderRadius = 24; 
        const path = `
          M${borderRadius},0 
          L${cardWidth - borderRadius},0 
          Q${cardWidth},0 ${cardWidth},${borderRadius}
          L${cardWidth},${cardHeight - borderRadius}
          Q${cardWidth},${cardHeight} ${cardWidth - borderRadius},${cardHeight}
          L${borderRadius},${cardHeight}
          Q0,${cardHeight} 0,${cardHeight - borderRadius}
          L0,${borderRadius}
          Q0,0 ${borderRadius},0
        `;

        gsap.to(light, {
          motionPath: {
            path: path,
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
          },
          duration: 4 + index * 0.5, 
          repeat: -1,
          ease: "none",
          delay: index * 0.8, 
        });

        gsap.to(light, {
          opacity: 0.8,
          scale: 1.5,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      });

      const skillCards = document.querySelectorAll(".skill-card");
      skillCards.forEach((card) => {
        const tl = gsap.timeline({ paused: true });
        const cardGlow = card.querySelector(".card-glow");
        const categoryIcon = card.querySelector(".category-icon");
        const travelingLight = card.querySelector(".traveling-light");

        tl.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
          .to(
            cardGlow,
            {
              opacity: 0.3,
              duration: 0.3,
            },
            0
          )
          .to(
            categoryIcon,
            {
              scale: 1.1,
              duration: 0.3,
            },
            0
          )
          .to(
            travelingLight,
            {
              opacity: 1,
              scale: 2,
              duration: 0.3,
            },
            0
          );

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

      const skillsShowcase = document.querySelector(".skills-showcase");
      if (skillsShowcase) {
        gsap.to(skillsShowcase, {
          x: "-50%",
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      gsap.to(".glow-pulse", {
        opacity: 0.3,
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5,
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="relative min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"
    >
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-slate-800/50 z-50 backdrop-blur-sm">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left scale-x-0 shadow-lg shadow-blue-500/25"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-pulse absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="glow-pulse absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="glow-pulse absolute top-3/4 left-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
            <Sparkles className="sparkle text-yellow-400/80 w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            >
              Technical{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Skills
              </span>
            </h2>
            <Sparkles className="sparkle text-yellow-400/80 w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
          </div>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg lg:text-xl text-slate-300/70 max-w-3xl mx-auto min-h-[2rem] font-light leading-relaxed"
          ></p>
        </div>

        <div className="overflow-hidden mb-8 sm:mb-12 opacity-60">
          <div className="skills-showcase flex whitespace-nowrap py-2">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center mx-6 sm:mx-8"
              >
                <Star className="text-yellow-400/60 w-3 h-3 mr-2 animate-pulse" />
                <span className="text-slate-400/60 text-sm font-light tracking-wide">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card group relative bg-white/[0.02] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div
                className={`traveling-light absolute w-3 h-3 rounded-full bg-gradient-to-r ${skill.color} opacity-60 blur-sm shadow-lg pointer-events-none z-20`}
                style={{
                  boxShadow: `0 0 20px currentColor, 0 0 40px currentColor`,
                }}
              ></div>

              <div
                className={`card-glow absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 rounded-2xl sm:rounded-3xl blur-2xl transition-all duration-500 group-hover:opacity-20`}
              ></div>

              <div
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-4 sm:mb-6">
                  <div
                    className={`category-icon flex-shrink-0 text-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg shadow-black/20 group-hover:shadow-xl transition-all duration-300`}
                  >
                    {skill.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 truncate">
                      {skill.category}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400/70 font-light leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {skill.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="skill-item group/item p-3 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div
                            className={`${tech.color} flex-shrink-0 p-1.5 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors duration-300`}
                          >
                            {tech.icon}
                          </div>
                          <span className="text-white/90 font-medium text-sm truncate">
                            {tech.name}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400/60 font-light ml-2">
                          {tech.level}%
                        </span>
                      </div>

                      <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                        <div
                          className={`progress-bar h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden shadow-sm`}
                          data-level={tech.level}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute top-3 right-3 opacity-20 pointer-events-none">
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skill.color} animate-pulse`}
                  ></div>
                </div>
                <div className="absolute bottom-3 left-3 opacity-20 pointer-events-none">
                  <div
                    className={`w-1 h-1 rounded-full bg-gradient-to-r ${skill.color} animate-pulse delay-1000`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 bg-white/[0.02] backdrop-blur-sm rounded-full border border-white/5 hover:border-white/10 transition-all duration-300 group">
            <Sparkles className="sparkle text-yellow-400/60 w-4 h-4 group-hover:text-yellow-400/80 transition-colors duration-300" />
            <span className="text-slate-300/70 font-light text-sm sm:text-base">
              Always learning and growing
            </span>
            <Sparkles className="sparkle text-yellow-400/60 w-4 h-4 group-hover:text-yellow-400/80 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
