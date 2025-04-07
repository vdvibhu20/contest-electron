	//@ts-ignore
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useQuizQuestionById from "../../hooks/quizzes/useQuizQuestionById"
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import IQuizQuestionChoice from "../../types/IQuizQuestionChoice";
import QuizQuestionsViewLoader from "./QuizQuestionViewLoader";
import TContentAttempt from "../../types/TContentAttempt";
import Pulse from '../Pulse';

interface IProps {
  questionId: string,
  questionNumber: number,
  questionSubmission: {id: string, question_id: string, answer_ids: [string], review_later: boolean},
  contentAttempt: TContentAttempt,
  saveQuizQuestionSubmissionMutation: any
}

export default function QuizQuestionView({ 
  questionId, 
  questionNumber, 
  questionSubmission, 
  contentAttempt,
  saveQuizQuestionSubmissionMutation }: IProps) {
  const [savePulseTriggered, setSavePulseTriggered] = useState(false)
  const {
    data: question,
    isFetching
  } = useQuizQuestionById(questionId)
  const saveSubmission = (choiceId: string | null, reviewLater: boolean = false) => {
    let answerIds: [string] | []
    if(choiceId) {
      if(questionSubmission?.answer_ids.includes(choiceId)) 
      answerIds = []
      else answerIds = [choiceId]
    } else {
      answerIds = questionSubmission?.answer_ids || []
    }
    saveQuizQuestionSubmissionMutation.mutate({
      ...(questionSubmission?.id && { id: questionSubmission?.id}),
      question_id: questionId,
      answer_ids: answerIds,
      review_later: reviewLater,
      content_attempt: { id: contentAttempt.id }
    })
  }

  useEffect(() => {
    if(saveQuizQuestionSubmissionMutation.isSuccess) {
      setSavePulseTriggered(true)
    }
  }, [saveQuizQuestionSubmissionMutation.isSuccess])

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex align-center">
          <h3 className="text-white text-xl mr-1">Question {questionNumber}{isFetching && <span className="dot-loader"></span>}</h3>
          {saveQuizQuestionSubmissionMutation.isLoading && 
            <span><span className="animate-pulse text-light-1 bg-dark-2 rounded-md py-1 px-3">Saving</span></span>}
          {saveQuizQuestionSubmissionMutation.isSuccess && 
            <Pulse triggered={savePulseTriggered} setTriggered={setSavePulseTriggered}><span className="text-light-1 bg-dark-2 rounded-md py-1 px-3">Saved</span></Pulse>}
        </div>
        <div className="cursor-pointer" onClick={() => saveSubmission(null, !questionSubmission?.review_later)}>
          <span className={`w-[20px] h-[20px] inline-block rounded-full mr-3 ${questionSubmission?.review_later ? 'bg-radial-gradient-orange' : 'bg-radial-gradient-grey'}`}></span>
          <span className="align-top text-orange-500">Review Later</span>
        </div>
      </div>
      {isFetching ?
        <QuizQuestionsViewLoader />
        :
        <div>
          <p className="font-normal text-base text-light-1 bg-dark-2 rounded-lg p-4">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
              }}
            >
              {question?.description}
            </ReactMarkdown>
          </p>
          <div className="my-5">
            {question?.choices.map((choice: IQuizQuestionChoice, i: number) => (
              <div key={i}
                className="my-4 flex cursor-pointer"
                onClick={() => saveSubmission(choice.id, questionSubmission?.review_later)}
              >
                <span className={`w-[20px] h-[20px] inline-block rounded-full mr-3 ${questionSubmission?.answer_ids?.includes(choice.id) ? 'bg-radial-gradient-green-bright' : 'bg-radial-gradient-grey'}`}></span>
                <ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
  }}
>
                  {choice.description}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}