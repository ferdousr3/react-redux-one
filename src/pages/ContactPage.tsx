import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, ContactFormValues } from "@/lib/contact/contact.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import {
  ChevronDown,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react"

export function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: ContactFormValues) {
    console.log("Contact data:", data)
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully!")
      form.reset()
    }, 1000)
  }

  return (
    <div className="container py-10 md:py-20">
      <section className="py-24 ">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col md:flex-row">
            {/* Contact Info */}
            <div className="md:w-5/12 bg-emerald-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-medium tracking-tight mb-2">
                  Get in touch
                </h3>
                <p className="text-emerald-200 text-sm mb-8">
                  Ready to modernize your legal strategy? Reach out to our
                  intake team.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 text-emerald-400" />
                    <div>
                      <div className="font-medium text-sm">Headquarters</div>
                      <div className="text-emerald-200 text-sm mt-1">
                        100 Financial District Blvd
                        <br />
                        New York, NY 10005
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-emerald-400" />
                    <div>
                      <div className="font-medium text-sm">Email</div>
                      <div className="text-emerald-200 text-sm mt-1">
                        counsel@veritas.legal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 text-emerald-400" />
                    <div>
                      <div className="font-medium text-sm">Phone</div>
                      <div className="text-emerald-200 text-sm mt-1">
                        +1 (212) 555-0199
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <div className="text-xs text-emerald-400 uppercase tracking-widest font-medium mb-4">
                  Connect
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors"
                  >
                    <Linkedin className="w-[18px] h-[18px]" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-emerald-800 hover:bg-emerald-700 transition-colors"
                  >
                    <Twitter className="w-[18px] h-[18px]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-7/12 p-10 bg-white">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    placeholder="jane@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm appearance-none cursor-pointer">
                      <option>General Counsel</option>
                      <option>Litigation Support</option>
                      <option>User Management Demo</option>
                      <option>Compliance Audit</option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm resize-none"
                    placeholder="Tell us about your legal needs..."
                  ></textarea>
                </div>

                {/* Custom Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 cursor-pointer rounded border border-slate-300 bg-white transition-all checked:border-emerald-600 checked:bg-emerald-600"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slate-500 cursor-pointer select-none"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-emerald-600 underline decoration-emerald-600/30 underline-offset-2"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-emerald-600 underline decoration-emerald-600/30 underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <button
                  type="button"
                  className="w-full h-11 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
