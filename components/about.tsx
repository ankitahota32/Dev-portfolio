"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from 'next/image'

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".gif-container",
        { opacity: 0, scale: 0.8, rotationY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".gif-container",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".gif-float", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

  
      gsap.to(".gif-glow", {
        opacity: 0.6,
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-content">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="text-blue-400">Me</span>
            </h2>
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              I am a passionate full-stack developer with expertise in the MERN
              stack, Next.js, and modern web technologies. I love creating
              scalable applications that solve real-world problems and deliver
              exceptional user experiences.
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              With a strong foundation in both frontend and backend development,
              I specialize in building robust, performant applications using
              React, Node.js, and cutting-edge frameworks like Next.js and
              Nest.js.
            </p>
            
          </div>

          <div className="about-content gif-container">
            <div className="relative">
              <div className="gif-glow absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>

              <div className="gif-float relative w-full h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-500">
                <Image
                  src="https://camo.githubusercontent.com/5bf0da46c5398f75e2ec953592c02afcf69379dcdb12a0c2922654a57b51fce2/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313336343032392f73637265656e73686f74732f31363039333236382f6d656469612f36386538326137666234393034363134613930363664366235343063313462322e676966"
                  alt="gif"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={300}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 text-fuchsia-200 text-sm font-mono">
                  {"{ coding... }"}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 text-blue-400 text-sm font-mono">
                  npm run dev
                </div>

                <div className="absolute top-4 right-4 flex space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
                </div>

                <div className="absolute bottom-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
