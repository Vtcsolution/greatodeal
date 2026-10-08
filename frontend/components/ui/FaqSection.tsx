export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({ title = 'Frequently Asked Questions', faqs }: { title?: string; faqs: FaqItem[] }) {
  if (!faqs?.length) return null;

  return (
    <section className="py-20 sm:py-24 bg-[#060606] border-y border-white/[0.04]">
      <div className="container max-w-[1920px] px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{title}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white/[0.02] border border-white/[0.04] open:border-[#6EE7B7]/20 rounded-xl px-5 py-4 transition-colors duration-500">
              <summary className="flex items-center justify-between gap-4 cursor-pointer font-semibold text-white/90 list-none [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="shrink-0 text-[#6EE7B7] text-xl leading-none font-normal group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <p className="mt-3 text-[#999] leading-relaxed text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
