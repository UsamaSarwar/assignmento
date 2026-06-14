import { Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <i className="fab fa-github"></i>, href: "https://github.com/UsamaSarwar", label: "GitHub" },
    { icon: <i className="fab fa-linkedin"></i>, href: "https://linkedin.com/in/UsamaSarwarPro", label: "LinkedIn" },
    { icon: <i className="fab fa-instagram"></i>, href: "https://instagram.com/UsamaSarwarPro", label: "Instagram" },
    { icon: <i className="fab fa-facebook"></i>, href: "https://facebook.com/UsamaSarwarPro", label: "Facebook" },
    { icon: <i className="fab fa-twitter"></i>, href: "https://twitter.com/UsamaSarwarPro", label: "Twitter" },
    { icon: <i className="fab fa-whatsapp"></i>, href: "https://wa.me/923100007773", label: "WhatsApp" },
  ]

  return (
    <footer className="w-full py-12 mt-20 bg-card/30">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-8 text-muted-foreground transition-all duration-300">
          <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
          <span className="text-sm font-medium">Made with love by Usama Sarwar</span>
        </div>

        <div className="flex justify-center flex-wrap gap-6 mb-10">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-125"
              aria-label={link.label}
            >
              <div className="text-2xl">{link.icon}</div>
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground mb-10">
          <a href="mailto:contact@usama.dev" className="hover:text-primary transition-colors">Contact Us</a>
          <a href="#" className="hover:text-primary transition-colors">DMCA</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <button 
            onClick={() => {
              localStorage.removeItem('assignmento-consent');
              window.location.reload();
            }} 
            className="hover:text-primary transition-colors"
          >
            Cookie Settings
          </button>
        </nav>

        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-tight">
            © {currentYear} <a href="https://assignmento.usama.dev/" className="hover:underline">Assignmento</a> | Text to Handwriting Converter
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            Assignmento is a free text to handwriting converter that is the best online tool for making handwritten documents without wasting your precious time.
          </p>
        </div>
      </div>
    </footer>
  )
}
