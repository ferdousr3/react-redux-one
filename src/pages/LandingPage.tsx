import { Link } from "react-router-dom"
import {
  Scale,
  Calendar,
  Briefcase,
  ShieldCheck,
  Files,
  ChevronRight,
  Activity,
  LayoutDashboard,
  Check,
  Filter,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Star,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { HeroSection } from "@/lib/home/components/heroSection"
import { ServicesSection } from "@/lib/home/components/servicesSectio"

export function LandingPage() {
  return (
    <div className="bg-slate-50 text-slate-600 antialiased">
      <HeroSection />
      <ServicesSection />

      {/* Stats Section with Gradient */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Trusted by Professionals
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Numbers That Matter
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Join thousands of professionals who trust our platform for their legal management needs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Active Users", icon: Users },
              { value: "50K+", label: "Cases Managed", icon: Briefcase },
              { value: "99.9%", label: "Uptime", icon: Activity },
              { value: "4.9", label: "User Rating", icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white mb-4 shadow-lg shadow-emerald-500/25">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Powerful Features
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Comprehensive tools designed to streamline your workflow and boost productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Case Management",
                description: "Organize and track all your cases with intelligent categorization and deadlines.",
                icon: Briefcase,
                gradient: "from-blue-500 to-blue-600",
              },
              {
                title: "Document Vault",
                description: "Secure, encrypted storage for all your sensitive legal documents.",
                icon: Files,
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                title: "Team Collaboration",
                description: "Work seamlessly with your team with real-time updates and commenting.",
                icon: Users,
                gradient: "from-purple-500 to-purple-600",
              },
              {
                title: "Calendar Integration",
                description: "Never miss a deadline with smart calendar syncing and reminders.",
                icon: Calendar,
                gradient: "from-orange-500 to-orange-600",
              },
              {
                title: "Security First",
                description: "Enterprise-grade security with end-to-end encryption and 2FA.",
                icon: ShieldCheck,
                gradient: "from-red-500 to-red-600",
              },
              {
                title: "Analytics Dashboard",
                description: "Get insights into your practice with detailed analytics and reporting.",
                icon: Activity,
                gradient: "from-cyan-500 to-cyan-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* 3D floating icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Management / Platform Feature Section */}
      <section
        id="platform"
        className="py-24 bg-slate-900 text-slate-300 overflow-hidden relative"
      >
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-900/20 rounded-full blur-[128px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="text-emerald-400 font-medium text-sm mb-4 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Client Dashboard
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Complete visibility
                </span>{" "}
                into your legal ecosystem.
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Gone are the days of email tag. Our user management system gives
                you role-based access to your entire case history, billing, and
                document repository in real-time.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium block text-sm">
                      Role-Based Permissions
                    </strong>
                    <span className="text-xs text-slate-500">
                      Grant specific access to stakeholders and auditors.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium block text-sm">
                      Secure Document Vault
                    </strong>
                    <span className="text-xs text-slate-500">
                      End-to-end encrypted storage for sensitive material.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium block text-sm">
                      Real-time Updates
                    </strong>
                    <span className="text-xs text-slate-500">
                      Stay informed with instant notifications and updates.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right UI Mockup */}
            <div className="lg:w-1/2 w-full">
              <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-200">
                    Client Users
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors">
                      Add User
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-800/80">
                      <tr>
                        <th className="px-4 py-3 font-medium">User</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium text-right">
                          Access
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-slate-300">
                      <tr className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                          <div className="font-medium text-white">
                            Sarah Jenkins
                          </div>
                        </td>
                        <td className="px-4 py-3">Administrator</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-mono text-slate-500">
                          Full
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400"></div>
                          <div className="font-medium text-white">
                            David Chen
                          </div>
                        </td>
                        <td className="px-4 py-3">Auditor</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-mono text-slate-500">
                          Read-Only
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
                          <div className="font-medium text-white">
                            Elena Rodriguez
                          </div>
                        </td>
                        <td className="px-4 py-3">External Counsel</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-400 border border-slate-600">
                            Pending
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-mono text-slate-500">
                          Limited
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of legal professionals who have streamlined their workflow with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-600 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/lawyers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
            >
              View Our Lawyers
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <Mail className="w-4 h-4" />
                Contact Us
              </span>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Let's Start a Conversation
                </span>
              </h2>
              <p className="text-slate-500 mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Address</div>
                    <div className="text-slate-500">123 Legal Street, New York, NY 10001</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Email</div>
                    <div className="text-slate-500">hello@veritas.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Phone</div>
                    <div className="text-slate-500">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
