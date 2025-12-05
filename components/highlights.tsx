export function Highlights() {
  const highlights = [
    {
      title: "Personalised to your goals",
      description: "Saving money, eating healthier, cooking faster. MealPlate adapts to what you want to achieve.",
    },
    {
      title: "Budget-friendly planning",
      description: "Set your spending target. We find meals that fit and scan local stores for better value.",
    },
    {
      title: "Made for real weekday cooking",
      description: "Simple meals shaped to your routine. No chef-level recipes you'll never make.",
    },
  ]

  return (
    <section className="bg-white py-6 md:py-8 -mx-4 md:-mx-6 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 text-center mb-4">
          Why MealPlate exists
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-5 h-full"
            >
              <h3 className="font-semibold text-sm md:text-base text-slate-900 mb-1">
                {highlight.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

