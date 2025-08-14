const Introduction = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p>
          The GMAT Official Practice Exams are a simulation of the real GMAT™
          exam. While they do use the same scoring algorithm as the actual
          GMAT™ exam, there are some differences between the practice exams and
          the real exam which are detailed on the following screens.
        </p>

        <p>
          We recommend that all test takers review the tutorial content provided
          within the practice exams at least one time within 3 days of your exam
          day so the information is fresh in your mind.
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

        <p>
          The GMAT™ exam is owned by the Graduate Management Admission Council
          (GMAC), including the copyrights for all GMAT questions in the test
          and prep materials.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
