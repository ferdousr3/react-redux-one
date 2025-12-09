import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 relative overflow-hidden text-gray-600">

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
                <Link to="/" className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2 justify-center md:justify-start">
                    <div className="w-2 h-6 bg-[#dd0031] flex flex-col justify-between py-0.5">
                        <div className="w-full h-1 bg-white/50"></div>
                        <div className="w-full h-1 bg-white/50"></div>
                    </div>
                    EngineSales
                </Link>
                <p className="mt-4 text-gray-500 max-w-xs text-center md:text-left">
                    The world's most trusted marketplace for high-performance engines and transmissions.
                </p>
            </div>

            <div className="flex gap-6">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="p-2 rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-[#dd0031] hover:text-white hover:border-[#dd0031] transition-all shadow-sm">
                        <Icon className="w-5 h-5" />
                    </a>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-12">
            <div>
                <h4 className="font-bold mb-6 text-gray-900">Inventory</h4>
                <ul className="space-y-4 text-gray-500">
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">V8 Engines</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">JDM Imports</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Transmissions</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Performance Parts</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-gray-900">Company</h4>
                <ul className="space-y-4 text-gray-500">
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">About Us</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Warranty Info</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Mechanic Network</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-gray-900">Support</h4>
                <ul className="space-y-4 text-gray-500">
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Shipping Policy</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Returns</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">Fitment Guide</Link></li>
                    <li><Link to="#" className="hover:text-[#dd0031] transition-colors">FAQs</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold mb-6 text-gray-900">Contact</h4>
                <ul className="space-y-4 text-gray-500">
                    <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#dd0031]"/> sales@enginesales.com</li>
                    <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#dd0031]"/> +1 (800) ENGINE-1</li>
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#dd0031]"/> Detroit, MI</li>
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; 2025 EngineSales LLC. All rights reserved.</p>
            <div className="flex gap-6">
                <Link to="#" className="hover:text-[#dd0031] transition-colors">Privacy Policy</Link>
                <Link to="#" className="hover:text-[#dd0031] transition-colors">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  )
}
