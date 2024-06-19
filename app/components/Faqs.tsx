import React, { useState } from 'react';

const FAQItem = ({ question, answer, id, isOpen, onToggle }) => {
  return (
    <div className={`hs-accordion ${isOpen ? 'hs-accordion-active:bg-white dark:hs-accordion-active:bg-white' : ''} rounded-xl p-6`} id={`hs-basic-with-title-and-arrow-stretched-heading-${id}`}>
      <button
        className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition dark:text-neutral-200 dark:hover:text-neutral-400"
        aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${id}`}
        onClick={onToggle}
      >
        {question}
        <svg className={`${isOpen ? 'block' : 'hidden'} flex-shrink-0 size-5 text-white group-hover:text-gray-500 dark:text-neutral-400`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
        <svg className={`${isOpen ? 'hidden' : 'block'} flex-shrink-0 size-5 text-white group-hover:text-gray-500 dark:text-neutral-400`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id={`hs-basic-with-title-and-arrow-stretched-collapse-${id}`} className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`} aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${id}`}>
        <p className="text-white dark:text-neutral-200 ${isOpen ? 'block' : 'hidden'}">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'Can I cancel at anytime?',
      answer: 'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.',
    },
    {
      id: 2,
      question: 'My team has credits. How do we use them?',
      answer: 'Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.',
    },
    {
      id: 3,
      question: "How does Preline's pricing work?",
      answer: 'Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.',
    },
    {
      id: 4,
      question: 'How secure is Preline?',
      answer: 'Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.',
    },
    {
      id: 5,
      question: 'How do I get access to a theme I purchased?',
      answer: "If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.",
    },
    {
      id: 6,
      question: 'Upgrade License Type',
      answer: 'There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.',
    },
  ];

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">Your questions, answered</h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">Answers to the most frequently asked questions.</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="hs-accordion-group">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === faq.id}
              onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
