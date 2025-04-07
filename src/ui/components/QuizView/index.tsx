import { useEffect, useState } from 'react'
import useQuizById from '../../hooks/quizzes/useQuizById'
import useTopContentAttempt from '../../hooks/contentAttempts/useTopContentAttempt'
import useSaveQuizQuestionSubmission from '../../hooks/quizzes/useMutateQuizQuestionSubmission'
import QuizQuestionView from './QuizQuestionView'
import QuizQuestionsView from './QuizQuestionsView'
import QuizContentLoader from '../QuizContentLoader'
import TContentAttempt from '../../types/TContentAttempt'
// import TQuizQuestionSubmission from '../../types/TQuizQuestionSubmission'

interface IProps {
  quizId: string
  contentId: string
  contestId: string
}

export default function QuizView({ quizId, contentId, contestId }: IProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState('')
  const [questionSubmissionsMap, setQuestionSubmissionsMap] = useState({} as {[id: string]: any})
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1)
  const {
    isFetching: isFetchingQuiz,
    data: quiz
  } = useQuizById(quizId, { contest_id: contestId })
  
  const {
    	//@ts-ignore
    isFetching: isFetchingTopContentAttempt,
    data: topContentAttempt,
    refetch: refetchTopContentAttempt,
  } = useTopContentAttempt(contentId, contestId)

  const saveQuizQuestionSubmissionMutation = useSaveQuizQuestionSubmission()

  useEffect(() => {
    if(saveQuizQuestionSubmissionMutation.isSuccess) {
      refetchTopContentAttempt()// WARNING: This can cause load on server
    }
  }, [saveQuizQuestionSubmissionMutation.isSuccess])

  useEffect(() => {
    if (quiz?.questions?.length) {
      setCurrentQuestionId(quiz.questions[0])
    }
  }, [quiz])

  useEffect(() => {
    if (!!currentQuestionId) {
      setCurrentQuestionNumber(quiz.questions.indexOf(currentQuestionId) + 1)
    }
  }, [currentQuestionId])

  useEffect(() => {
    if(topContentAttempt?.id) {
      const questionSubmissionsMap = {} as any
      topContentAttempt?.quiz_question_submissions?.map(_ => {
        questionSubmissionsMap[_.question_id] = _
      })
      setQuestionSubmissionsMap(questionSubmissionsMap)
    }

  }, [topContentAttempt])

  return (
    <div className="h-full">
      {isFetchingQuiz ? <QuizContentLoader /> :
        <div className="flex flex-wrap h-full">
          <div className="w-4/6 p-10 h-full overflow-scroll">
            <h1 className="text-white font-bold text-2xl mb-5">Quiz: {quiz?.title}</h1>
            {currentQuestionId && topContentAttempt?.id && 
              <QuizQuestionView
                questionId={currentQuestionId}
                questionNumber={currentQuestionNumber}
                questionSubmission={questionSubmissionsMap[currentQuestionId]}
                contentAttempt={topContentAttempt as TContentAttempt}
                saveQuizQuestionSubmissionMutation={saveQuizQuestionSubmissionMutation}
              />}
          </div>
          <div className="w-2/6 px-4 pt-10 h-full overflow-scroll relative before-border-left">
            <QuizQuestionsView
              questionIds={quiz?.questions}
              setCurrentQuestionId={setCurrentQuestionId}
              currentQuestionId={currentQuestionId}
              questionSubmissionsMap={questionSubmissionsMap}
            />
          </div>
        </div>
      }
    </div>
  )
}