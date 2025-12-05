import { Activity, Calendar, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export function HeroSection() {
  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Now accepting new corporate clients
            </div>
            <h1 className="text-5xl lg:text-6xl font-medium text-slate-900 tracking-tight leading-[1.1] mb-6">
              Legal precision for the{" "}
              <span className="text-emerald-700">modern enterprise.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Manage contracts, disputes, and compliance with our AI-enhanced
              legal platform. Combining top-tier counsel with transparent user
              management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="h-12 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                Schedule Consultation
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <a
                href="#services"
                className="h-12 px-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                View Practice Areas
              </a>
            </div>

            <div className="mt-12 flex items-center gap-4 text-xs font-medium text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
              </div>
              <p>Trusted by 500+ companies</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-slate-200 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
              <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                </div>
                <div className="mx-auto text-[10px] font-medium text-slate-400 bg-white px-3 py-0.5 rounded-md border border-slate-100 shadow-sm">
                  veritas-portal.com/dashboard
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">
                      Active Litigation
                    </h3>
                    <div className="text-2xl font-semibold text-slate-900 tracking-tight">
                      Case #492-AC
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                      <Activity className="w-3 h-3" />
                      In Progress
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
                    <span>Discovery</span>
                    <span className="text-emerald-700">85% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-emerald-500 rounded-full"></div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-medium text-slate-500 mb-3">
                    Assigned Attorneys
                  </h4>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                        JD
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          Jessica Doe
                        </div>
                        <div className="text-xs text-slate-500">
                          Senior Partner
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer mt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                        MR
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          Marcus Ross
                        </div>
                        <div className="text-xs text-slate-500">Associate</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
