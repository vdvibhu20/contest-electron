import IContent from "./IContent";
import TContestAttempt from "./TContestAttempt";
import TQuizQuestionSubmission from "./TQuizQuestionSubmission";

type TContentAttempt = {
  id: string;
  content: IContent;
  contest_attempt: TContestAttempt;
  quiz_question_submissions?: [TQuizQuestionSubmission]
}

export default TContentAttempt;