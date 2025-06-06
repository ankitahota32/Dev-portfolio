"use client"

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap/gsap-core";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(".nav-item", { opacity: 0, y: -20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5 
    })
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({behavior: "smooth"})
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="nav-item text-xl font-bold">
            <span className="text-stone-300">Dev</span>
            <span className="text-indigo-400">Portfolio</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects",
              "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="nav-item text-white/80 hover:text-white transition-colors duration-300 capitalize">
                  {item}
                </button>
              ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-2 text-white/80 hover:text-white transition-colors duration-300 capitalize">
                {item}
                </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}