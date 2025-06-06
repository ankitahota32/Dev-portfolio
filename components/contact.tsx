"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  MapPin,
  Send,
  Rocket,
  Satellite,
  Globe,
  Zap,
} from "lucide-react";
import { Ray } from "three";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef<HTMLElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".contact-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(planetRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.to(satelliteRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none",
        transformOrigin: "150px 150px",
      });

      gsap.to(rocketRef.current, {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      gsap.utils.toArray(".space-particle").forEach((particle, index) => {
        gsap.to(particle as HTMLElement, {
          y: "random(-30, 30)",
          x: "random(-30, 30)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });

        gsap.to(particle as HTMLElement, {
          opacity: "random(0.3, 1)",
          duration: "random(2,4)",
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: "random(0,2)",
        });
      });

      gsap.utils.toArray(".cosmic-ray").forEach((ray, index) => {
        gsap.fromTo(
          ray as Ray,
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 0.6,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.5,
          }
        );
      });

      const createContactShootingStar = () => {
        const star = document.createElement("div");
        star.className =
          "absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 50 + "%";

        if (contactRef.current) {
          contactRef.current.appendChild(star);
        }
        gsap.fromTo(
          star,
          {
            x: -50,
            y: -50,
            opacity: 0,
            scale: 0,
          },
          {
            x: 100,
            y: 100,
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power2.out",
            onComplete: () => star.remove(),
          }
        );

        gsap.to(star, {
          boxShadow:
            "0 0 15px rgba(59, 130, 246, 0.8), -30px -30px 8px rgba(147, 51, 234, 0.4)",
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const shootingInterval = setInterval(createContactShootingStar, 4000);

      const formFields = document.querySelectorAll(".space-input");
      formFields.forEach((field) => {
        const focusHandler = () => {
          gsap.to(field, {
            scale: 1.02,
            boxShadow:
              "0 0 30px rgba(59,130,246,0.3), 0 0 60px rgba(147, 51, 234, 0.2)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const blurHandler = () => {
          gsap.to(field, {
            scale: 1,
            boxShadow: "0 0 0px rgba(59,130,246,0), 0 0 0px rgba(147,51,234,0)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        field.addEventListener("focus", focusHandler);
        field.addEventListener("blur", blurHandler);
      });

      gsap.to(".signal-pulse", {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
        stagger: 0.3,
      });

      return () => {
        clearInterval(shootingInterval);
      };
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    gsap.to(rocketRef.current, {
      y: -200,
      x: 100,
      rotation: -45,
      scale: 0.5,
      duration: 2,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(rocketRef.current, { y: 0, x: 0, rotation: 0, scale: 1 });
      },
    });

    console.log("Form submitted: ", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative py-20 px-6 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={planetRef}
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-sm opacity-60"
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40 blur-xs"></div>
          <div className="absolute top-4 left-6 w-3 h-3 bg-white/60 rounded-full blur-sm"></div>
          <div className="absolute bottom-6 right-8 w-2 h-2 bg-blue-300/80 rounded-full blur-sm"></div>
        </div>

        <div ref={satelliteRef} className="absolute top-20 right-20">
          <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-sm transform rotate-45 relative">
            <div className="absolute -top-1 -left-1 w-1 h-6 bg-gray-300 transform -rotate-45"></div>
            <div className="absolute -top-1 -right-1 w-1 h-6 bg-gray-300 transform -rotate-45"></div>
            <Satellite className="absolute -top-2 -left-2 w-8 h-8 text-gray-300" />
          </div>
        </div>

        <div ref={rocketRef} className="absolute bottom-20 left-10">
          <Rocket className="w-12 h-12 text-orange-400 drop-shadow-lg" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-orange-500 via-red-500 to-transparent opacity-80 blur-sm"></div>
        </div>

        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="space-particle absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}

        
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`ray-${i}`}
            className="cosmic-ray absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              width: Math.random() * 200 + 100 + "px",
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`pulse-${i}`}
            className="signal-pulse absolute w-4 h-4 border-2 border-cyan-400/50 rounded-full"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 contact-content">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Globe className="text-blue-400 w-8 h-8 animate-spin-slow" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <Zap className="text-yellow-400 w-8 h-8 animate-pulse" />
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Ready to launch your next project into the digital universe? Let&apos;s
            connect across the cosmos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="contact-content space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <Satellite className="text-cyan-400 w-6 h-6" />
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="group relative bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">
                      Email
                    </p>
                    <p className="text-white font-medium">
                      ankitahota3264@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-purple-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">
                      Location
                    </p>
                    <p className="text-white font-medium">Berhampur, Odisha, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-500/10 border border-green-400/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">
                  Status: Ready for New Missions
                </span>
              </div>
            </div>
          </div>

          <div className="contact-content">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <Rocket className="text-orange-400 w-6 h-6" />
              Mission Launch Pad
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Sender&apos;s Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your identity..."
                  value={formData.name}
                  onChange={handleChange}
                  className="space-input w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.05] transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Sender&apos;s Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={formData.email}
                  onChange={handleChange}
                  className="space-input w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.05] transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Mission Brief
                </label>
                <textarea
                  name="message"
                  placeholder="Describe your project or mission..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="space-input w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="group relative w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative">Launch Mission</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-white/10 contact-content">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-400"></div>
          </div>
          <p className="text-white/60">
            Copyright @ 2025 Ankita Hota
          </p>
        </div>
      </div>
    </section>
  );
}
