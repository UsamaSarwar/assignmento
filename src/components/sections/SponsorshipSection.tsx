import { Heart } from "lucide-react"

export function SponsorshipSection() {
  return (
    <section id="sponsorship" className="py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Heart className="h-4 w-4 fill-primary" />
          <span>Support the Project</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center justify-center gap-3">
          Sponsorship <Heart className="h-8 w-8 text-destructive fill-destructive" />
        </h2>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          Assignmento is completely free and open-source. We don't sell your data or charge for features. 
          If you find this tool helpful, consider becoming a sponsor to help us keep it running and sustainable!
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <a 
            href="https://www.patreon.com/usamasarwar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img 
              loading="lazy" 
              className="h-12 rounded-lg shadow-lg shadow-orange-500/20" 
              alt="Become a Patron" 
              src="https://c5.patreon.com/external/logo/become_a_patron_button.png" 
            />
          </a>
          
          <a 
            href="https://www.buymeacoffee.com/UsamaSarwar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img 
              loading="lazy" 
              className="h-12 rounded-lg shadow-lg shadow-yellow-500/20" 
              alt="Buy me a Coffee" 
              src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" 
            />
          </a>
        </div>
      </div>
    </section>
  )
}
