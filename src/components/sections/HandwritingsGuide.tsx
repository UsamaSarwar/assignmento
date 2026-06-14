import { ExternalLink, Upload, Wand2, FileText, PencilLine } from "lucide-react"

export function HandwritingsGuide() {
  const steps = [
    {
      title: "Create your Font",
      description: "Use Calligraphr to generate a custom font from your own handwriting. It's free and easy to use.",
      icon: <ExternalLink className="h-5 w-5" />,
      link: "https://www.calligraphr.com/en/",
      linkText: "Visit Calligraphr"
    },
    {
      title: "Get your .ttf File",
      description: "Download the generated .ttf or .otf file of your handwriting from the tool.",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Upload to Assignmento",
      description: "Click 'Handwriting' in the customization bar and upload your file via the 'Upload .ttf/.otf' button.",
      icon: <Upload className="h-5 w-5" />,
    },
    {
      title: "Write Away!",
      description: "Type your content and see it instantly transformed into your very own handwriting.",
      icon: <Wand2 className="h-5 w-5" />,
    },
  ]

  return (
    <section id="handwritings" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center justify-center gap-3">
              Guide <PencilLine className="h-8 w-8 text-primary" />
            </h2>
            <p className="text-muted-foreground text-lg">
              Want to use your own handwriting? Follow these simple steps to add your personal touch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-lg">
                  {index + 1}
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl">{step.title}</h3>
                    <span className="text-muted-foreground">{step.icon}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {step.link && (
                    <a 
                      href={step.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium pt-1"
                    >
                      {step.linkText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
