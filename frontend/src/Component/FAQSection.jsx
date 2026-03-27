const FAQSection = () => {
  const faqs = [
    { question: "How do I book a package?", answer: "You can book any package directly from the Packages page." },
    { question: "Do you offer group discounts?", answer: "Yes! Contact us for group booking discounts." },
    { question: "Can I cancel or reschedule?", answer: "Yes, our cancellation policy applies." },
  ];

  return (
    <section className="faq-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, idx) => (
            <div className="accordion-item" key={idx}>
              <h2 className="accordion-header" id={`heading${idx}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`}>
                  {faq.question}
                </button>
              </h2>
              <div id={`collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQSection;