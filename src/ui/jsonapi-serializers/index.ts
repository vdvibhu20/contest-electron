import JSONApiSerializer from 'json-api-serializer';

const serializer = new JSONApiSerializer({
  convertCase: 'kebab-case',
  unconvertCase: 'snake_case'
})

serializer.register('choices', {
  id: 'id'
})

serializer.register('content-attempt', {
  id: 'id',
  relationships: {
    quiz_question_submissions: { type: 'quiz-question-submission'}
  }
})

serializer.register('quiz-question', {
  id: 'id',
  relationships: {
    choices: { type: 'choice'}
  }
})

serializer.register('quiz_question_submissions', {
  id: 'id',
  relationships: {
    content_attempt: { type: 'content-attempt' }
  }
})

serializer.register('quiz', {
  id: 'id',
  relationships: {
    questions: { type: 'question'}
  }
})

serializer.register('contests', {
  id: 'id',
})

serializer.register('competition', {
  id: 'id',
  relationships:  {
    contests: { type: 'contest'}
  }
})

serializer.register('users', {
  id: 'id'
})

serializer.register('competition-leaderboard', {
  id: 'id',
  relationships: {
    user: { type: 'user' }
  }
})

export default serializer
