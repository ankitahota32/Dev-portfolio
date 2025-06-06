"use client"

import { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei"
import { gsap } from "gsap/gsap-core"
import { ChevronDown } from "lucide-react"

function AnimatedSphere() {
  const meshRef = useRef<any>()

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }
  }, [])

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color='#191970' attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Sphere>
  )
}

function GalaxyBackground() {
  return (
    <>
      <Stars radius={300} depth={60} count={1000} factor={7}
        saturation={0} fade={true} speed={0.5} />
      
      <Stars radius={100} depth={30} count={500} factor={3} saturation={0.2} fade={true} speed={0.8} />
    </>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(".hero-title", { opacity: 0, y: 100 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out"  })
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
      )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3",
      )
        .fromTo(
          ".scroll-indicator",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2",
      )

      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      gsap.utils.toArray(".star").forEach((star: any, index) => {
        gsap.to(star, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.1,
        })
      
        gsap.to(star, {
          opacity: "random(0.3, 1)",
          duration: "random(1,3)",
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: "random(0,2)",
        })
      })

      gsap.to(".galaxy-arm", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      })

      gsap.to(".nebula-cloud", {
        scale: "random(0.8, 1.2)",
        opacity: "random(0.1, 0.3)",
        duration: "random(8, 12)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 2,
      })

      const createShootingStar = () => {
        const shootingStar = document.createElement("div")
        shootingStar.className = "shooting-star absolute w-1 h-1 bg-white rounded-full"
        shootingStar.style.left = Math.random() * 100 + "%"
        shootingStar.style.top = Math.random() * 50 + "%"

        if (starsRef.current) {
          starsRef.current.appendChild(shootingStar)
        }

        gsap.fromTo(
          shootingStar,
          {
            x: -100,
            y: -100,
            opacity: 0,
            scale: 0,
          },
          {
            x: 200,
            y: 200,
            opacity: -1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
              shootingStar.remove()
            },
          },
        )

        gsap.to(shootingStar, {
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), -50px -50px 10px rgba(255,255,255,0.3)",
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const shootingStarInterval = setInterval(createShootingStar, 3000)

      return () => {
        clearInterval(shootingStarInterval)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={starsRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`large-star-${i}`}
            className="star absolute w-1 h-1 bg-white rounded-full opacity:-80"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 100 + "s",
            }}
          />
        ))}

        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`medium-star-${i}`}
            className="star absolute w-0.5 h-0.5 bg-blue-200 rounded-full opacity-60"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 100 + "s",
            }}
          />
        ))}

        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={`small-star-${i}`}
            className="star absolute w-px h-px bg-purple-200 rounded-full opacity-40"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}

        <div className="galaxy-arm absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-12 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-12 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-pink-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-12 blur-sm"></div>
        </div>

        <div className="nebula-cloud absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="nebula-cloud absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-pink-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="nebula-cloud absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-purple-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
      

      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`galaxy-${i}`}
          className="absolute w-2 h-2 bg-gradient-radial from-white/30 to-transparent rounded-full blur-sm opacity-50"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
          }}
        />
      ))}

      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="constellation-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <line
          x1="20%"
          y1="30%"
          x2="35%"
          y2="25%"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
        />
        <line
          x1="35%"
          y1="25%"
          x2="45%"
          y2="35%"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
        />
        <line
          x1="45%"
          y1="35%"
          x2="60%"
          y2="20%"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
        />

        <line
          x1="70%"
          y1="60%"
          x2="80%"
          y2="45%"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
        />
        <line
          x1="80%"
          y1="45%"
          x2="85%"
          y2="65%"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
        />

        <line
          x1="15%"
          y1="70%"
          x2="25%"
          y2="80%"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
        />
        <line
          x1="25%"
          y1="80%"
          x2="40%"
          y2="75%"
          stroke="url(#constellation-gradient)"
          strokeWidth="1"
        />
      </svg>

      {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`bright-star-${i}`}
            className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: Math.random() * 2 + 1 + "s",
              boxShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(59,130,246,0.4)",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">Full Stack</span>
          <br />
          <span className="text-blue-400">Developer</span>
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl text-white/80 mb-4">
          MERN Stack • Next.js • Nest.js • Docker
        </p>

        <p className="hero-description text-lg text-white/60 max-w-2xl mx-auto mb-12">
          Crafting modern web applications with cutting-edge technologies and
          seamless user experiences
        </p>

        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="text-white/60 animate-bounce" size={32} />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-5" />
    </section>
  );
}
