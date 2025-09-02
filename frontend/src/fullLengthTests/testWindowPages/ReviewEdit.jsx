import bookmark from "../../assets/bookmark.png";
import bookmarkFilled from "../../assets/bookmarkFilled.png";
import ReviewOne from "../../assets/reviewOne.png";
import confirm from "../../assets/confirm.png";
const ReviewEdit = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Question Review & Edit
        </h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p className="text-base">
          At the end of each section, you can review as many questions as you
          would like and can edit up to three (3) answers,{" "}
          <strong>within the section's allotted time.</strong> When answering a
          question, you can bookmark it by clicking the{" "}
          <img
            src={bookmark}
            alt="Clock icon"
            width={30}
            className="inline mx-1"
          />
          icon. When a question is bookmarked, the icon will be filled in:
          <span className="">
            <img
              src={bookmarkFilled}
              alt="Restore icon"
              width={30}
              className="inline mx-1 "
            />
            . Clicking the icon again will remove the bookmark. Bookmarking
            questions during the exam can make the Question Review & Edit
            process more efficient.
          </span>
        </p>

        <p>
          Once you have answered all questions in a section, you will proceed to
          the <strong>Question Review & Edit</strong> screen for that section,
          where you can review and edit your answers.{" "}
          <strong>
            {" "}
            If there is no time remaining in the section, you will not proceed
            to the Question Review & Edit screen, and you will automatically be
            moved to your optional break or the next section (if you have
            already taken your optional break).
          </strong>
        </p>
        <p>
          The Question Review & Edit screen includes a numbered list of section
          questions and indicates questions you bookmarked. You can click on any
          question number to review that question. When your review is complete,
          or if you do not wish to review or edit any items in a section, you
          can click the "End Section Review" button to proceed:
        </p>

        <div className="flex justify-center">
          <img src={ReviewOne} alt="" className="w-[70%]" />
        </div>
        <p>
          If you edit an answer, when you click the "Confirm Answer" button, you
          will be prompted to confirm your answer change before proceeding:
        </p>
        <div className="flex justify-center">
          <img src={confirm} alt="" className="w-[40%]" />
        </div>
        <p>
         <strong> If time expires while you are in the process of reviewing and/or
          editing questions, you will automatically be moved to your optional
          break or the next section of the exam.</strong>
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

export default ReviewEdit;
