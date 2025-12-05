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
  ChevronDown,
  Send,
} from "lucide-react"
import { HeroSection } from "@/lib/home/components/heroSection"
import { ServicesSection } from "@/lib/home/components/servicesSectio"

export function LandingPage() {
  return (
    <div className="bg-slate-50 text-slate-600 antialiased ">
      <HeroSection />
      <ServicesSection />
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
              <h2 className="text-3xl lg:text-4xl font-medium text-white tracking-tight mb-6">
                Complete visibility into your legal ecosystem.
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

      {/* Contact Section */}

    </div>
  )
}
