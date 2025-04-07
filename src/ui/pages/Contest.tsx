// import { useRouter } from 'next/router';
import useCurrentContestAttempt from '../hooks/contestAttempts/useCurrentAttempt';
import useSession2 from '../hooks/useSession2';
import useContestById from '../hooks/contests/useContestById';
import useContentById from '../hooks/useContentById';
import QuizView from '../components/QuizView';
import useSolutionStubByProblemId from '../hooks/useSolutionStubByProblemId';
import Split from 'react-split';
import ProblemStatementPane from '../components/ProblemStatementPane';
import ProblemEditorPane from '../components/ProblemEditorPane';
import useSubmitContestAttempt from '../hooks/contestAttempts/useSubmitContestAttempt';
import Button from '../components/Button';
// import { TimerResult, TimerSettings, useTimer } from 'react-timer-hook';
import Timer from '../components/Timer';
import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import ProblemLoader from '../components/ProblemLoader';
import { useNavigate } from 'react-router-dom';

export default function ContestAttemptPage() {
const navigate=useNavigate()
	// const router = useRouter();
	// const contestId = router.query.id as string;
	// const contentId = router.query.contentId as string;
	const [contentId, setContentId] = useState(localStorage.getItem('contentId') as string);
	const contestId = localStorage.getItem('contestId') as string;
	const { status: sessionStatus } = useSession2();
	console.log('contestId', contestId);
	const contestByIdQuery = useContestById(
		contestId,
		{
			include: ['l~contents'],
			sort: '+model_contents.order',
		},
		{ enabled: !!contestId }
	);
	console.log('ContestByIdQuery', contestByIdQuery);
	
	const currentAttemptQuery = useCurrentContestAttempt(contestId, {
		enabled: !!contestByIdQuery?.data?.id && sessionStatus === 'AUTHENTICATED',
	});
console.log('CurrentAttemptQuery', currentAttemptQuery);
	const contentByIdQuery = useContentById(
		contentId,
		{
			include: ['l~problem', 'l~quiz', 'l~createdBy', 'l~contentTags'],
			contest_id: contestId,
		},
		{ enabled: !!currentAttemptQuery?.data?.id }
	);
console.log('ContentByIdQuery', contentByIdQuery);
	const solutionStubQuery = useSolutionStubByProblemId(
		contentByIdQuery?.data?.problem?.id as number,
		{
			enabled: !!contentByIdQuery?.data?.id,
		}
	);
console.log('SolutionStubQuery', solutionStubQuery);

	const contestAttemptMutation = useSubmitContestAttempt(
		currentAttemptQuery.data?.id as string
	);

	useEffect(() => {
		if (contestAttemptMutation.isSuccess) {
			navigate(`/contests/${contestId}`)
		}
	}, [contestAttemptMutation])

	if (
		contestByIdQuery.isLoading ||
		contestByIdQuery.isIdle ||
		contestByIdQuery.isError ||
		currentAttemptQuery.isLoading ||
		currentAttemptQuery.isIdle ||
		currentAttemptQuery.isError ||
		contentByIdQuery.isLoading ||
		contentByIdQuery.isIdle ||
		contentByIdQuery.isError
	) {
		return null;
	}

	// If the user is unauthenticated or the user does not have contest-attempt
	// route it to contest detail page
	// if (
	// 	sessionStatus === 'UNAUTHENTICATED' ||
	// 	currentAttemptQuery.data === null
	// ) {
	// 	router.push(`/contests/${contestId}`);
	// 	return null;
	// }

	const contest = contestByIdQuery.data;
	const content = contentByIdQuery.data;
	console.log('Contest', contest);
	console.log('Content', content);
	const handleCloseApp = () => {

		window.electron.closeApp(); 
	  };
	 
	return (
		<div>
			<div className="bg-dark-1 p-5 border-b border-dark-0">
				<div className="flex justify-between">
					<h1 className="text-white font-bold text-2xl">{contest?.name}</h1>
					<div className="flex items-center">
						<div className="text-primary mr-3">
							<Timer
								endTime={parseISO(
									currentAttemptQuery.data?.['end-time'] as string
								)}
								onTimerEnd={() =>
									contestAttemptMutation.mutate(
										currentAttemptQuery.data?.id as string
									)
								}
							/>
						</div>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								contestAttemptMutation.mutate(
									currentAttemptQuery.data?.id as string
								)
							}
						>
							Submit
						</Button>
						<button	onClick={handleCloseApp}
							className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200"
							>
							x
						</button>
					</div>
				</div>
			</div>
			<div className="flex">
				<div className="w-[90px] h-[calc(100vh-75px)] overflow-scroll bg-dark-1 text-white">
					{contest?.contents.map((content, index) => (
						<button
							key={content.id}
							className={`h-[45px] text-red text-xl block m-auto ${contentId == content.id ? 'text-primary' : ''
								}`}
							onClick={() =>		
								{	console.log('clicked',content.id)
									setContentId(content.id);
									navigate(`/contests/${contestId}/attempt/${content.id}`)
								}
							}
						>
							&lt;/&gt; {index + 1}
						</button>
					))}
				</div>
				<div className="h-[calc(100vh-75px)] w-[calc(100vw-90px)] bg-dark-3">
					{contentByIdQuery.isLoading || contentByIdQuery.isFetching? <ProblemLoader fullscreen={true} /> :
						content && content.type === 'quiz' ? (
							<QuizView
								quizId={content.quiz?.id as string}
								contentId={contentId}
								contestId={contestId}
							/>
						) :
							content && content.type === 'problem' && solutionStubQuery.data ? (
								<Split minSize={450} className="split h-full w-full flex flex-row" id="problem-split">
									<ProblemStatementPane data={content} fullScreen={true} />
									<div style={{ width: 'calc(50% - 5px)', height: '100%' }}>
										<ProblemEditorPane
											key={content.id}
											content={content}
											solutionStub={solutionStubQuery.data}
											fullScreen={true}
											contest={contest}
										/>
									</div>
								</Split>
							) : null
					}
				</div>
			</div>
		</div>
	);
}
