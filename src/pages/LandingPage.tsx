import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Cog, Gauge, ShieldCheck, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Real Engine Images from Unsplash
const engines = [
  {
    id: 1,
    name: "LS3 V8 Crate Engine",
    hp: "430 HP",
    price: "$8,450",
    image: "https://images.unsplash.com/photo-1597687838006-036de5a5c6cb?auto=format&fit=crop&q=80&w=800",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "2JZ-GTE Inline-6",
    hp: "320 HP",
    price: "$12,000",
    image: "https://images.unsplash.com/photo-1616789916327-7757ee92a95c?auto=format&fit=crop&q=80&w=800",
    badge: "JDM Legend"
  },
  {
    id: 3,
    name: "Coyote 5.0L V8",
    hp: "460 HP",
    price: "$9,200",
    image: "https://images.unsplash.com/photo-1506469717960-433cebe3f181?auto=format&fit=crop&q=80&w=800",
    badge: "Modern Muscle"
  },
  {
    id: 4,
    name: "Cummins 6.7L Turbo Diesel",
    hp: "1000 lb-ft",
    price: "$14,500",
    image: "https://images.unsplash.com/photo-1594947963364-e4a0709b537c?auto=format&fit=crop&q=80&w=800",
    badge: "Heavy Duty"
  }
]

export function LandingPage() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Hero Text Animation
    gsap.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    })

    // Image Animation
    gsap.from(".hero-image", {
      x: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power2.out"
    })

    // Scroll Trigger for Features
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    })

  }, { scope: container })

  return (
    <div ref={container} className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden selection:bg-black selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-20 bg-white">
         {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="max-w-xl">
                <div className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-900 font-bold text-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                    Powering 10,000+ Builds
                </div>
                <h1 className="hero-text text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-gray-900">
                    Precision <br />
                    <span className="text-gray-900">Powerplants.</span>
                </h1>
                <p className="hero-text text-xl text-gray-600 mb-8 leading-relaxed">
                    Source the world's finest crate engines, transmissions, and performance components. Dyno-tested and ready to ship.
                </p>
                <div className="hero-text flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2 group">
                        Browse Inventory <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                        Fitment Guide
                    </button>
                </div>

                <div className="hero-text mt-12 flex items-center gap-8 text-gray-500 font-medium text-sm">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-gray-900" /> 1 Year Warranty</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-gray-900" /> Dyno Verified</div>
                </div>
            </div>

            <div className="hero-image relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-red-900/10 border border-gray-100 bg-white">
                    <img
                        src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1000"
                        alt="High Performance Engine"
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-6 border-t border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Featured</p>
                            <p className="font-bold text-gray-900">Twin-Turbo V8 Platform</p>
                        </div>
                        <div className="text-right">
                             <p className="text-2xl font-bold text-gray-900">$18,500</p>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-100 rounded-full blur-[100px] opacity-30 -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-[100px] opacity-30 -z-10"></div>
            </div>
        </div>
      </section>

      {/* --- INVENTORY SECTION --- */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Arrivals</h2>
                    <p className="text-gray-600 max-w-lg">Hand-picked engines from our latest acquisition. Verified compression and leak-down tested.</p>
                </div>
                <Link to="/products" className="text-gray-900 font-bold hover:text-black flex items-center gap-2">View All <ArrowRight className="w-4 h-4"/></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {engines.map((engine) => (
                    <motion.div
                        key={engine.id}
                        whileHover={{ y: -10 }}
                        className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img src={engine.image} alt={engine.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                {engine.badge}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{engine.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900">
                                    <Gauge className="w-3 h-3 mr-1" /> {engine.hp}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    In Stock
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <span className="text-2xl font-bold text-gray-900">{engine.price}</span>
                                <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="features-section py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
             <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-gray-900 font-bold tracking-wider uppercase text-sm">Why EngineSales?</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-2">More than just parts.</h2>
                <p className="text-gray-600 mt-4">We are an engineering-first company. Every engine sold goes through our rigorous 150-point inspection process.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="feature-card text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="w-16 h-16 bg-gray-200 text-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Wrench className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Expertly Reconditioned</h3>
                    <p className="text-gray-600">Every used block is disassembled, cleaned, and machined to factory tolerances by ASE-certified master mechanics.</p>
                </div>
                <div className="feature-card text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="w-16 h-16 bg-gray-200 text-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Gauge className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Dyno Verification</h3>
                    <p className="text-gray-600">We don't guess. We verify. Every crate engine is run on our in-house SuperFlow dyno to ensure it meets advertised power.</p>
                </div>
                <div className="feature-card text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="w-16 h-16 bg-gray-200 text-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Ironclad Warranty</h3>
                    <p className="text-gray-600">Peace of mind included. All engines come with our standard 1-Year/12,000-Mile warranty, upgradable to 3 Years.</p>
                </div>
             </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gray-900 z-0">
            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" alt="Background" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl font-bold text-white mb-6">Ready to swap?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">Start your build today. Our team of experts is standing by to help you choose the perfect powertrain for your project.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg">
                    Find My Engine
                </button>
                <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all">
                    Contact Sales
                </button>
            </div>
         </div>
      </section>

    </div>
  )
}
