export function DMCA() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">DMCA Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          Assignmento respects the intellectual property rights of others. In accordance with the Digital Millennium 
          Copyright Act ("DMCA"), we will respond promptly to notices of alleged infringement that are reported to 
          Assignmento's Designated Copyright Agent.
        </p>

        <h2 className="text-2xl font-semibold text-foreground">Notification of Infringement</h2>
        <p>
          If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive 
          right under copyright, please report alleged copyright infringements taking place on or through the Site by 
          completing a DMCA Notice of Alleged Infringement and delivering it to our Designated Copyright Agent.
        </p>

        <h2 className="text-2xl font-semibold text-foreground">DMCA Notice Requirements</h2>
        <p>
          To be effective, the notification must include the following:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A physical or electronic signature of the copyright owner or person authorized to act on their behalf;</li>
          <li>Identification of the copyrighted work claimed to have been infringed;</li>
          <li>Identification of the material that is claimed to be infringing and where it is located on the Site;</li>
          <li>Your contact information, including your address, telephone number, and an email address;</li>
          <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and</li>
          <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground">Counter-Notification</h2>
        <p>
          If you believe that your material has been removed by mistake or misidentification, you may submit a 
          written counter-notification to us. Your counter-notification must satisfy the requirements of 17 U.S.C. § 512(g)(3).
        </p>

        <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
        <p>
          All DMCA notices should be sent to: <a href="mailto:contact@usama.dev" className="text-primary hover:underline">contact@usama.dev</a>
        </p>
      </div>
    </div>
  )
}
