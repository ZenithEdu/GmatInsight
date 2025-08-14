const ExamQuestions = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          GMAT™ Exam Questions
        </h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p>
          You must select an answer to each question before moving on to the
          next question – no skipping. You can bookmark questions as you move
          through them to mark them for review after you complete all the
          questions in a section.
        </p>
        <p>
          Note that in some sections of the GMAT™ exam, certain parts of a
          question may remain the same through multiple questions (For example:
          visual graphics or text passages).
        </p>
        <p>
          If you do not finish all the questions in the allotted time for a
          section, your score will reflect a penalty for not finishing the
          section.
        </p>
        {/* Styled Next Button in Content */}
        <p className="mt-8">
          Click{" "}
          <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecbff] px-3 py-1 rounded ">
            <span className="relative">
              <span className="border-b-2 border-white pb-[1px]">N</span>ext
            </span>
            <div className="ml-2 w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:bg-gray-100 transition-all duration-200">
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

export default ExamQuestions;
