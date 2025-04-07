import { Dispatch, SetStateAction} from "react"

interface IProps {
  questionIds: [string],
  currentQuestionId: string,
  setCurrentQuestionId: Dispatch<SetStateAction<string>>
  questionSubmissionsMap: {[id: string]: any}
}

export default function QuizQuestionsView({questionIds, setCurrentQuestionId, currentQuestionId, questionSubmissionsMap}: IProps) {
  const nextQuestion = () => {
    const currentQuestionIndex = questionIds.indexOf(currentQuestionId)
    if(currentQuestionIndex === questionIds.length -1) return 
    setCurrentQuestionId(questionIds[currentQuestionIndex + 1])
  }

  const prevQuestion = () => {
    const currentQuestionIndex = questionIds.indexOf(currentQuestionId)
    if(currentQuestionIndex === 0) return 
    setCurrentQuestionId(questionIds[currentQuestionIndex - 1])
  }

  return (
    <div>
      <h3 className="text-white font-bold text-xl text-center mb-4">Questions</h3>
      <div className="flex justify-center mb-4">
        <div>
          <span className="text-green-500 mx-xl-3 mx-2"><span className="w-[10px] h-[10px] inline-block rounded-full bg-radial-gradient-green mr-3"></span>Attempted</span>
        </div>
        {/* <div>
          <span className="mx-xl-3 mx-2"><span className="w-[10px] h-[10px] inline-block rounded-full bg-radial-gradient-grey mr-3">⦁</span>Unattempted</span>
        </div> */}
        <div>
          <span className="text-orange-500 mx-xl-3 mx-2"><span className="w-[10px] h-[10px] inline-block rounded-full bg-radial-gradient-orange mr-3"></span>Marked
            for Review</span>
        </div>
      </div>

      <div className="flex justify-center flex-wrap p-5">
        {questionIds?.map((id, i) => (
          <div key={i}
            className={`w-[40px] h-[40px] cursor-pointer m-2 rounded-full text-center pt-2.5 
            ${questionSubmissionsMap[id]?.review_later ? 'bg-radial-gradient-orange' : 
            questionSubmissionsMap[id]?.answer_ids?.length ? 'bg-radial-gradient-green' :
            currentQuestionId == id ? 'bg-radial-gradient-grey':
            'bg-dark-2'}`}
            onClick={() => setCurrentQuestionId(id)}>
            {i + 1}
          </div>
        ))}
      </div>
      
      <div className="text-center my-4">
        <button className="mr-4" onClick={() => prevQuestion()}>&lt; Prev</button>
        <span>{questionIds.indexOf(currentQuestionId) + 1}</span>
        <button className="ml-4" onClick={() => nextQuestion()}>Next &gt;</button>
      </div>
    </div>
  )
}