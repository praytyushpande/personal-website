import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What is Orb Labs?',
      answer: 'Orb Labs is an independent AI research lab focused on advancing artificial intelligence through long-term research in world models, scientific foundations, biology, and autonomous systems.'
    },
    {
      question: 'What do you research?',
      answer: 'Our work focuses on spatiotemporal world models, foundation models for biology and drug design, scalable AI architectures, and neural network interpretability and safety.'
    },
    {
      question: 'Do you publish research?',
      answer: 'Yes. Open science is core to our mission. We publish papers, technical briefs, benchmarks, datasets, and open-source packages to empower the global developer and research community.'
    },
    {
      question: 'Can students contribute?',
      answer: 'Absolutely. We offer summer internships and research residencies for outstanding undergraduate and PhD students. You can also collaborate through academic partnerships.'
    },
    {
      question: 'Do you collaborate with universities and startups?',
      answer: 'Yes, we collaborate extensively. We partner with academic departments for specialized compute clusters and work alongside deep-tech startups to deploy research models into physical testbeds.'
    }
  ];

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-24 lg:py-36 bg-bg border-b border-border">
      <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* FAQ Main List - Left Side */}
          <div className="lg:col-span-8 space-y-10 border border-border p-6 lg:p-12 rounded-lg bg-bg">
            <div className="space-y-3">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
                Common Queries
              </span>
              <h3 className="text-4xl lg:text-5xl font-display font-light">
                FAQ
              </h3>
            </div>
            
            <div className="divide-y divide-border font-body">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-5 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex justify-between items-center text-left py-2 font-bold text-fg hover:text-accent transition-colors focus:outline-none"
                  >
                    <span className="text-base lg:text-lg">{faq.question}</span>
                    <span className="text-accent text-lg font-light shrink-0 ml-4">
                      {openIndex === idx ? '−' : '+'}
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-fg/60 text-sm lg:text-base leading-relaxed font-light pb-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Summary Panel - Right Side */}
          <div className="lg:col-span-4 bg-surface border border-border-strong p-8 lg:p-10 rounded-lg flex flex-col justify-between font-body">
            <div className="space-y-6">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
                Office Hours
              </span>
              <h4 className="text-2xl lg:text-3xl font-display italic text-fg">
                Join the conversation.
              </h4>
              <p className="text-xs lg:text-sm text-fg/50 leading-relaxed font-light">
                We host weekly online office hours to discuss pre-prints, critique architectures, and review datasets. Anyone in the community is welcome to join.
              </p>
            </div>
            
            <div className="pt-12 border-t border-border mt-8">
              <span className="text-[10px] uppercase tracking-widest text-fg/40 block mb-2">Schedule</span>
              <p className="text-sm font-bold text-fg">Every Thursday @ 17:00 UTC</p>
              <a 
                href="#contact" 
                className="inline-block mt-4 text-xs font-semibold uppercase tracking-widest text-accent hover:underline"
              >
                Request Access link →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
