const TestingRules = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Testing Rules</h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p>
          Disruptive behavior will not be permitted. The Test Administrator will
          determine what constitutes disruptive behavior. The Test Administrator
          is authorized to dismiss you from the test session for disruptive
          behavior and to notify GMAC and its delivery partners of the action
          taken.
        </p>
        <p>
          During this exam, you will have access to an online whiteboard to work
          through equations, use for scratch work, and take notes. If you are
          taking an online exam, use of an approved physical erasable whiteboard
          is permitted. The physical erasable whiteboard must be completely
          erased at the start and end of your exam and before your optional
          break.
        </p>
        <p>
          If at any time during the exam, you need assistance, or if there is a
          problem with your computer or workstation, raise your hand or start a
          chat with the Test Administrator.
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

export default TestingRules;
