import React, { useState } from "react";

const technicalFaqs = [
  {
    question:
      'I see a "Page not found" message when trying to access the test.',
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          <strong>Page not found</strong> errors can result from a number of
          different problems. Use the following checklist to try to resolve this
          problem:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-8">
          <li>
            Click the <strong>Refresh</strong> button on your browser to reload
            the page.
          </li>
          <li>
            See if you can access other sites over the Internet. If you are
            unable to access other sites, then there is an issue with your
            Internet connection.
          </li>
          <li>
            Ensure your computer meets system requirements and is configured
            properly:
            <ul className="list-[circle] list-inside pl-4 mt-1 space-y-1">
              <li>
                Your operating system and web browser should meet the minimum
                system requirements.
              </li>
              <li>
                Your pop-up blocker programs must be configured to allow pop-ups
                from the starttest.com site.
              </li>
              <li>
                Cookies must be enabled on your system as described in this
                document.
              </li>
              <li>
                Your browser caching settings should be set to automatically
                check for a new version every time you visit a page as described
                in this document.
              </li>
              <li>
                Your antivirus, firewall, proxy and content filter systems
                should be configured to allow inbound and outbound traffic from
                the starttest.com sites (you may need assistance from your
                technical support staff to check these settings).
              </li>
            </ul>
          </li>
        </ol>
        <p className="ml-6">
          If you have checked each of these items and you still receive the{" "}
          <strong>Page not found</strong> error, please contact Technical
          Support by visiting{" "}
          <span className="underline text-blue-600">
            GMAT Exam Prep - Product Activation, Technical Issues and General
            Questions
          </span>
          .{" "}
        </p>
      </div>
    ),
  },
  {
    question: "My test is slow.",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          If your test questions are loading slowly, it is likely that a poor
          internet connection is affecting how quickly your test questions load.
        </p>
        <p className="ml-6">
          This test requires a high-speed internet connection to share video and
          audio streams. If your internet connection slow, we recommend the
          following:
        </p>
        <ul className="list-disc list-inside pl-4 mt-1 space-y-1 ml-8">
          <li>
            Your operating system and web browser should meet the minimum system
            requirements.
          </li>
          <li>
            Your pop-up blocker programs must be configured to allow pop-ups
            from the starttest.com site.
          </li>
          <li>
            Cookies must be enabled on your system as described in this
            document.
          </li>
          <li>
            Your browser caching settings should be set to automatically check
            for a new version every time you visit a page as described in this
            document.
          </li>
          <li>
            Your antivirus, firewall, proxy and content filter systems should be
            configured to allow inbound and outbound traffic from the
            starttest.com sites (you may need assistance from your technical
            support staff to check these settings).
          </li>
        </ul>
        <p className="ml-6">
          If you believe there is a problem with the testing site, please visit{" "}
          <span className="underline text-blue-600">
            GMAT Exam Prep - Product Activation, Technical Issues and General
            Questions{" "}
          </span>
          .{" "}
        </p>
      </div>
    ),
  },
  {
    question: "Who do I Contact for Help?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          <strong>Technical Support</strong>
        </p>
        <p className="ml-6">
          If you are experiencing an issue not addressed in these FAQs, please
          contact Technical Support by visiting{" "}
          <span className="underline text-blue-600">
            GMAT Exam Prep - Product Activation, Technical Issues and General
            Questions
          </span>{" "}
          and we will be happy to assist you.{" "}
        </p>
      </div>
    ),
  },
  {
    question: "When I try to start my test, nothing happens",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          Check to see if you have a utility installed that blocks popup
          advertisements. These utilities may stop the test window from opening.
          If you do have a utility installed, either remove it, or turn it off
          while you are using the site. If you are not sure, hold the control
          key down when you click to start the test. Many of the utilities will
          temporarily turn off using this method.
        </p>
      </div>
    ),
  },
];

const privacyFaqs = [
  {
    question: "I am concerned about my privacy. Do you use cookies?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          The privacy of examinees, their personal information, and the test
          materials are extremely important. Session cookies are used to track
          the current test each examinee is taking. A session cookie is a
          special type of cookie that is only stored in memory, and is
          automatically deleted when the user closes the browser. Session
          cookies are used to track a user's current state during their visit,
          and require that session cookies be enabled to use the site. These
          cookies are automatically removed when the browser is closed. We do
          not use or support cookies that in any way are used to track an
          individual's Internet usage outside of our own web site.
        </p>
      </div>
    ),
  },
  {
    question: "How do I configure my browser to allow cookies?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          The testing platform uses session cookies to track each candidate's
          location in the test. To allow session cookies in most browsers:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-8">
          <li>
            Open the <strong>Tools</strong> menu in your browser (three dotted
            lines in the upper-right corner).
          </li>
          <li>Choose Settings.</li>
          <li>Type "cookies" in the Search bar.</li>
          <li>
            Locate the section that lists the web sites allowed to use cookies.
          </li>
          <li>Add *.starttest.com to the list of allowed sites.</li>
        </ul>
        <p className="ml-6">
          Note that the instructions may be slightly different depending on the
          browser that you use. Refer to your browser's Help files for more
          information.
        </p>
      </div>
    ),
  },
];

const faqGeneral = [
  {
    question: "Will my answers be lost if my computer crashes?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          No. All answers are saved each time you go to the next question. When
          you restart the test will start on the question that was displayed
          when you crashed.
        </p>
      </div>
    ),
  },
  {
    question: "I have a machine at home and at work. Can I use both?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          Yes. Your testing history is maintained on our servers. You can even
          restart or review tests that you started on a different machine.
        </p>
      </div>
    ),
  },
  {
    question:
      "GMAT™ Official Practice Exams: Can I take Practice Exams 1 and 2 more than once?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          It is possible to retake exams but keep in mind that with each retake,
          there is a higher chance that the questions will be repeated.
          Additionally, seeing a question multiple times increases the
          likelihood of getting it right, so resetting the exam multiple times
          is not recommended.
        </p>
      </div>
    ),
  },
  {
    question:
      "GMAT™ Official Practice Exams: Can I take Practice Exams 3–6 more than once?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">You can reset Practice Exams 3-6 once.</p>
      </div>
    ),
  },
  {
    question:
      "GMAT™ Official Practice Exams: How can I review my questions on the Score Report?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          Click on each section tab to see more details regarding your
          performance in that section, including performance and timing on each
          question and performance by question type and skills. To get an
          overview of your performance, click on the chart view.
        </p>
      </div>
    ),
  },
  {
    question:
      "GMAT™ Official Practice Exams: Can I take a practice exam on my phone/tablet?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          No. We require that you launch all Practice Exams from a desktop or
          laptop browser to replicate your test day experience.
        </p>
      </div>
    ),
  },
  {
    question:
      "GMAT™ Official Practice Exams: I repurchased the same practice exam product. Why is it not showing in my test portal?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          To access a repurchased practice exam, you must use up all your
          attempts for the paid exam. For instance, if you buy a practice exam 5
          twice, you must complete both attempts before the repurchased practice
          exam appears. Once you have completed all attempts for a practice
          exam, any newly purchased practice exam(s) will become available.
          However, if you repurchase the same exam, you may encounter some
          repeat questions.
        </p>
      </div>
    ),
  },
  {
    question:
      "GMAT™ Official Practice Exams: Can I open the exam on multiple browser windows?",
    answer: (
      <div className="space-y-2 text-[16px] text-gray-700">
        <p className="ml-6">
          We do not recommend this as it could result in errors and does not
          simulate the actual test-taking experience.
        </p>
      </div>
    ),
  },
];

const FaqPage = () => {
  const [expandedFaqs, setExpandedFaqs] = useState({
    technical: technicalFaqs.map(() => false),
    privacy: privacyFaqs.map(() => false),
    general: faqGeneral.map(() => false),
  });

  const toggleAll = (section, expand) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [section]: prev[section].map(() => expand),
    }));
  };

  const toggleOne = (section, index) => {
    setExpandedFaqs((prev) => {
      const updated = [...prev[section]];
      updated[index] = !updated[index];
      return { ...prev, [section]: updated };
    });
  };

  const handleExpandAll = () => {
    const allExpanded = [
      ...expandedFaqs.technical,
      ...expandedFaqs.privacy,
      ...expandedFaqs.general,
    ].every(Boolean);
    toggleAll("technical", !allExpanded);
    toggleAll("privacy", !allExpanded);
    toggleAll("general", !allExpanded);
  };
  
  const faqData = [
    ["Technical Support", technicalFaqs, "technical"],
    ["Privacy", privacyFaqs, "privacy"],
    ["Frequently Asked Questions", faqGeneral, "general"],
  ];

  return (
    <section className="text-base mt-8 space-y-6 px-6 md:px-16 lg:px-8">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <button
          className="text-white px-4 py-2 text-sm"
          style={{ backgroundColor: "#393636" }}
          onClick={handleExpandAll}
        >
          {[
            ...expandedFaqs.technical,
            ...expandedFaqs.privacy,
            ...expandedFaqs.general,
          ].every(Boolean)
            ? "COLLAPSE ALL"
            : "EXPAND ALL"}
        </button>

        <button
          className="flex items-center text-black px-6 py-3 rounded-full text-sm hover:bg-green-50 w-fit max-w-full"
          style={{
            border: "4px solid #62a52d",
            backgroundColor: "#F9F9F9",
          }}
        >
          <span className="whitespace-nowrap">
            SEARCH FREQUENTLY ASKED QUESTIONS
          </span>
          <svg
            className="ml-3 w-8 h-8 scale-x-[-1]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
            />
          </svg>
        </button>
      </div>
      {faqData.map(([title, faqList, section]) => (
        <div
          key={section}
          className="mb-8 bg-white p-4 border border-gray-300"
        >
          <h2 className="text-xl text-gray-800 mb-4">{title}</h2>
          <div className="space-y-0">
            {faqList.map((faq, index) => {
              const isOpen = expandedFaqs[section][index];

              return (
                <div
                  key={index}
                  className="border border-gray-300 bg-white"
                >
                  <button
                    onClick={() => toggleOne(section, index)}
                    className="w-full text-left flex items-center gap-3 p-4 bg-[#f9f9f9] hover:bg-gray-100"
                  >
                    <span
                      className={`text-gray-600 text-lg transition-transform duration-300 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    >
                      ▼
                    </span>
                    <span className="text-[17px] text-gray-800 font-medium">
                      {faq.question}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4">{faq.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default FaqPage;