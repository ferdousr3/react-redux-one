import { Briefcase, Files, ShieldCheck } from "lucide-react"

export function ServicesSection() {
  return (
    <>
      <section
        id="services"
        className="py-24 bg-white border-y border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-4">
              Comprehensive legal frameworks.
            </h2>
            <p className="text-slate-500">
              We leverage technology to reduce overhead and increase
              transparency in every case.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Corporate Governance
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Entity formation, board advisories, and shareholder agreements
                managed through our digital portal.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                IP Protection
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Secure your brand assets. Trademark filing and patent monitoring
                with real-time status updates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Files className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Mergers &amp; Acquisitions
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Due diligence data rooms and deal structuring powered by secure,
                collaborative tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
