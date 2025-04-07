type TQuizQuestionSubmission = {
  id: string
  question_id: string
  answer_ids: [string]
  review_later: boolean
}

export default TQuizQuestionSubmission