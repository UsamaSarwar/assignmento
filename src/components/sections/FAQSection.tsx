import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export function FAQSection() {
  const faqs = [
    {
      question: "Is Assignmento really free?",
      answer: "Yes, Assignmento is 100% free and open-source. We believe in providing accessible tools for students and teachers without any hidden costs."
    },
    {
      question: "Can I use my own handwriting font?",
      answer: "Absolutely! You can use tools like Calligraphr to create a font from your handwriting and then upload the .ttf or .otf file directly into our customization bar."
    },
    {
      question: "How does the multi-page generation work?",
      answer: "If your text is longer than what can fit on a single A4 page, our tool intelligently splits the content and generates multiple images. You can then download all of them as a single PDF."
    },
    {
      question: "Will my data be saved?",
      answer: "Your privacy is important to us. All text processing and image generation happen locally in your browser. We don't store your personal documents on any server."
    },
    {
      question: "Are the effects like 'scanner' or 'shadow' realistic?",
      answer: "Yes, we use advanced CSS filters and canvas processing to simulate realistic paper lighting and scanning artifacts, giving your documents an authentic physical look."
    }
  ]

  return (
    <section id="faq" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center justify-center gap-3">
              FAQ <HelpCircle className="h-8 w-8 text-primary" />
            </h2>
            <p className="text-muted-foreground text-lg">
              Common questions about our Text to Handwriting Converter.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
