import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, CloudUpload, Type, Sparkles } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Custom Handwriting",
      description: "Upload your own handwriting font (.ttf/.otf) to make documents look truly personal. Perfect for authentic-looking assignments.",
      icon: <CloudUpload className="h-6 w-6 text-primary" />,
    },
    {
      title: "Handwriting Styles",
      description: "Choose from a variety of built-in high-quality handwriting fonts or find more at Quantum Enterprises.",
      icon: <Type className="h-6 w-6 text-primary" />,
    },
    {
      title: "Realistic Effects",
      description: "Apply scanner, shadow, and noise effects to simulate the look of physical paper and realistic lighting.",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
    },
    {
      title: "Open-source",
      description: "Built for the community. Contribute to the project on GitHub and help us make it even better.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    },
  ]

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center justify-center gap-3">
            Features <Sparkles className="h-8 w-8 text-primary" />
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Assignmento is the ultimate tool for converting your digital text into realistic handwriting. 
            Designed for students, teachers, and professionals who value their time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-background shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 rounded-2xl bg-primary/5 w-fit">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
