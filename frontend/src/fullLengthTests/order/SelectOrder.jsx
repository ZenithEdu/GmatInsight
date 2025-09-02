import React, { useState } from "react";
const SelectOrder = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    {
      id: "option1",
      label: (
        <>
          Quantitative Reasoning
          <br />
          Verbal Reasoning
          <br />
          Data Insights
        </>
      ),
    },
    {
      id: "option2",
      label: (
        <>
          Verbal Reasoning
          <br />
          Data Insights
          <br />
          Quantitative Reasoning
        </>
      ),
    },
    {
      id: "option3",
      label: (
        <>
          Data Insights
          <br />
          Verbal Reasoning
          <br />
          Quantitative Reasoning
        </>
      ),
    },
    {
      id: "option4",
      label: (
        <>
          Quantitative Reasoning
          <br />
          Data Insights
          <br />
          Verbal Reasoning
        </>
      ),
    },
    {
      id: "option5",
      label: (
        <>
          Verbal Reasoning
          <br />
          Quantitative Reasoning
          <br />
          Data Insights
        </>
      ),
    },
    {
      id: "option6",
      label: (
        <>
          Data Insights
          <br />
          Quantitative Reasoning
          <br />
          Verbal Reasoning
        </>
      ),
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Select Section Order
        </h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p>
          <strong>
            Select the order in which the exam sections are to be administered.
          </strong>
        </p>

        <p className="text-red-600">
          You have one (1) minute to make your selection in the GMAT exam. If
          you do not make your selection within one (1) minute, the first option
          listed will be selected, and you will take the exam in the following
          order: Quantitative Reasoning, Verbal Reasoning, Data Insights.
        </p>
        <p className="text-red-600">
          Please note that in the GMAT Official Practice Exams, this screen is
          not timed.
        </p>
        <p>
          Six different section order options are presented below. Once you
          select your section order, you must view ALL questions in each
          section, in the order you selected, before moving to the next section.
          You will NOT be able to return to this screen.
        </p>

       {/* Radio Options (Both Rows Centered) */}
<div className="flex flex-col items-center justify-center mt-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {options.slice(0, 3).map((option) => (
      <div key={option.id} className="flex items-center p-4">
        <input
          type="radio"
          id={option.id}
          name="sectionOrder"
          value={option.id}
          checked={selectedOption === option.id}
          onChange={() => setSelectedOption(option.id)}
          className="h-3 w-3 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor={option.id}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
    {options.slice(3, 6).map((option) => (
      <div key={option.id} className="flex items-center p-4">
        <input
          type="radio"
          id={option.id}
          name="sectionOrder"
          value={option.id}
          checked={selectedOption === option.id}
          onChange={() => setSelectedOption(option.id)}
          className="h-3 w-3 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor={option.id}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>
</div>


        <p className="mt-8">
          Click the{" "}
          <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecbff] px-3 py-1 rounded">
            <span className="relative">
              <span className="border-b-2 border-white pb-[1px]">N</span>ext
            </span>
            <div className="ml-2 w-6 h-6 rounded-full bg-white flex items-center justify-center ">
              <svg
                className="w-4 h-4 text-[#2d9ecbff]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>{" "}
          button to start the exam. You will begin the GMAT™ exam on the next
          screen.
        </p>
      </div>
    </div>
  );
};

export default SelectOrder;
