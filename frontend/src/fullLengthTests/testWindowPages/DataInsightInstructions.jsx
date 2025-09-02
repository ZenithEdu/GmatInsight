const DataInsightInstructions = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Data Insights Instructions
        </h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p>
          When you take the GMAT™ exam you will have a specific amount of time
          to review these instructions. In the GMAT Official Practice Exams,
          this instruction screen is not timed, so you may want to spend extra
          time reviewing it.
        </p>
        <p>
          You are about to start the Data Insights section of the exam. You will
          have <strong>45 minutes</strong> to complete this section, including
          reviewing and editing answers. If you have a timed accommodation, your
          extra time will be noted on the exam clock timer in the upper
          right-hand corner.
        </p>
        <p>
          In this section, you will be presented with{" "}
          <strong>20 questions</strong>.
        </p>
        <p>
          You will be permitted to use a calculator in this section only. To
          access the calculator, click the calculator icon at the top of the
          screen. Note that the calculator can be dragged to any part of the
          screen.
        </p>
        <p>
          Several question types are used in Data Insights. Some require use of
          both quantitative and verbal skills. Some involve use of graphics,
          tables, or text material. The questions also use various response
          formats. For each question, review the text, graphic, or text material
          provided and respond to the task that is presented.
        </p>
        <p>There are five question formats in this section:</p>
        <ul className=" pl-12 space-y-6">
          <li>
            {" "}
            <strong>Multi-source Reasoning.</strong> Click on the tabs and
            examine all the relevant information from text, charts, and tables
            to answer the questions.
          </li>
          <li>
            <strong>Table Analysis.</strong> A table is to be analyzed and find
            whether answer statements are accurate.
          </li>
          <li>
            <strong>Graphics Interpretation.</strong> Interpret a graph or
            graphical image and select the option from a drop-down list to
            accurately complete response statements.
          </li>
          <li>
            <strong>Two-part Analysis.</strong> Two-component task is presented
            for a solution, with answer options provided in a two-column table
            format.
          </li>
          <li>
            <strong>Data Sufficiency.</strong> These problems consists of a
            questions and two statements, labeled (1) and (2), which contain
            certain data. Using these data and your knowledge of mathematics and
            everyday facts (such as the number of days in July or the meaning of
            the word counterclockwise), decide whether the data given are
            sufficient enough for answering the question and then select one of
            the following answer choices.
          </li>
          <ul className="list-disc pl-12 space-y-6">
            <li>
              Statement (1) ALONE is sufficient, but statement (2) alone is not
              sufficient to answer the question asked.
            </li>
            <li>
              Statement (2) ALONE is sufficient, but statement (1) alone is not
              sufficient to answer the question asked.
            </li>
            <li>
              BOTH statements (1) and (2) TOGETHER are sufficient to answer the
              question asked, but NEITHER statement ALONE is sufficient to
              answer the question asked.
            </li>
            <li>
              EACH statement ALONE is sufficient to answer the question asked.
            </li>
            <li>
              Statements (1) and (2) TOGETHER are NOT sufficient to answer the
              question asked, and additional data specific to the problem are
              needed.
            </li>
          </ul>
        </ul>
        <p className="pl-12">
          Note: In data sufficiency problems that ask for the value of a
          quantity, the data given in the statements are sufficient only when it
          is possible to determine exactly one numerical value for the quantity.
        </p>
        <p>
          You can view explanations of the format of the specific questions
          while answering items in this section by clicking on HELP.
       </p>
        {/* Styled Next Button in Content */}
        <p className="mt-8">
          Click{" "}
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
          to continue.
        </p>
      </div>
    </div>
  );
};

export default DataInsightInstructions;
