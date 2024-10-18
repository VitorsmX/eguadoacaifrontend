import { memo } from 'react';
import propTypes from 'prop-types';

const FaqSection = memo((props) => {

  if(!props || !props.faqs || props.faqs.length === 0) {
    return null
  }

  const { title, faqs } = props

  return (
    <section className="py-12 mt-20" id='faq1'>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq._key} className="bg-[#483058c5] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-200 whitespace-pre-line">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FaqSection.displayName = "FaqSection"

FaqSection.propTypes = {}
export default FaqSection;
