import { WaitlistForm } from "@/components/waitlist-form"

export default function WaitlistPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          You&apos;re early. MealPlate isn&apos;t ready yet.
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thanks for sharing. We&apos;re still building MealPlate and using your feedback to shape it. We&apos;ll notify you when it&apos;s ready.
        </p>
        <div className="max-w-md mx-auto">
          <WaitlistForm />
        </div>
      </div>
    </main>
  )
}

