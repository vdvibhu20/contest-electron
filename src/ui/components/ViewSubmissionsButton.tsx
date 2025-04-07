import TextButton from './TextButton';
import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import useSubmissionsDataByUserId from '../hooks/useSubmissionDataByUserId';
// import { useGetCurrentUser } from '../context/AuthProvider';
// import { useRouter } from 'next/router';
import TSubmission from '../types/TSubmission';
import Editor from '@monaco-editor/react';
import {format} from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Tab } from '@headlessui/react';
import SubmissionResultTab from './SubmissionResultTab';
// import {
// 	TSubmissionDataByIdResponse,
// } from '../hooks/useSubmissionDataById';
import { fetchMe } from '../hooks/useMeData';
import IUser from '../types/IUser';

export default  function ViewSubmissionsButton() {
	// const [user] = useGetCurrentUser();
	const [user, setUser] = useState<IUser | null>(null);
const contestId=localStorage.getItem('contestId');
	useEffect(() => {
		fetchMe().then((fetchedUser) => {
			setUser(fetchedUser);
			// console.log('submission', fetchedUser);
		});
	}, []);
	// const router = useRouter();
			// user_id: user ? user.id : undefined,
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const queryObj = {
		where: {
			user_id: user?.id,
			content_id: contestId as string,
			contest_id: {
				$notNull: '',
			},
		},
		sort: '-model."createdAt"',
		limit: '!',
	};
	//@ts-ignore
	const query = useSubmissionsDataByUserId(user?.id, queryObj, {
		enabled: isOpen,
	});

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<TextButton
				color="primary"
				size="small"
				onClick={() => setIsOpen(!isOpen)}
			>
				View submissions
			</TextButton>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-70" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-3xl bg-dark-5 p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-bold leading-6 text-white flex items-center"
									>
										<span className="flex-1">Your submissions</span>
										<TextButton
											color="secondary"
											size="normal"
											onClick={closeModal}
										>
											<FontAwesomeIcon icon={faXmark} />
										</TextButton>
									</Dialog.Title>
									<div className="mt-2">
										{query.data ? (
											<table className="mt-8 w-full border-4 border-solid border-dark-4 border-separate border-spacing-0 rounded-3xl overflow-hidden">
												<thead className="bg-dark-2 text-light-1">
													<tr>
														<th className="px-6 py-3 whitespace-nowrap text-sm text-left font-normal border-0 rounded-tl-2xl border-r border-dark-0">
															Date
														</th>
														<th className="px-6 py-3 whitespace-nowrap text-sm text-left font-normal border-0 border-r border-dark-0">
															Language
														</th>
														<th className="px-6 py-3 whitespace-nowrap text-sm text-left font-normal border-0 border-r border-dark-0">
															Score
														</th>
														{/* <th className="px-6 py-3 whitespace-nowrap text-sm font-normal border-r border-dark-0">
															Result
														</th> */}
														{/* <th className="px-6 py-3 whitespace-nowrap text-sm font-normal border-r border-dark-0">
															Testcases solved
														</th> */}
														<th className="px-6 py-3 whitespace-nowrap text-sm font-normal border-r border-dark-0">
															Status
														</th>
														<th className="px-6 py-3 whitespace-nowrap text-sm font-normal border-dark-0">
															Submission
														</th>
													</tr>
												</thead>
												<tbody className="bg-dark-3">
													{query.data.data.map((data) => (
														<Row
															key={data.id}
															data={data as TSubmission<'submit'>}
														/>
													))}
												</tbody>
											</table>
										) : null}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

type TRowProps = {
	data: TSubmission<'submit'>;
};

function Row({ data }: TRowProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function closeModal() {
		setIsOpen(false);
	}

	function getStatus(score: number) {
		switch (score) {
			case 100:
				return (
					<p className="bg-dark-0 rounded-sm text-[#83DB3B] text-sm font-bold">
						Solved
					</p>
				);
			case 0:
				return (
					<p className="bg-dark-0 rounded-sm text-[#F24F60] text-sm font-bold">
						Unsolved
					</p>
				);
			default:
				return (
					<p className="bg-dark-0 rounded-sm text-[#FB8133] text-sm font-bold">
						Partially solved
					</p>
				);
		}
	}

	return (
		<>
			<tr>
				<td className="py-4 px-6 text-white whitespace-nowrap font-normal text-base border-r  border-dark-0">
					{format(new Date(data.createdAt), 'do MMMM, hh:mm aa')}
				</td>
				<td className="py-4 px-6 text-white whitespace-nowrap font-normal text-base border-r  border-dark-0">
					{data.language}
				</td>
				<td className="py-4 px-6 text-white whitespace-nowrap font-normal text-base border-r  border-dark-0">
					{data.score} / 100
				</td>
				{/* <td className="py-4 px-6 text-white whitespace-nowrap font-normal text-base border-r  border-dark-0 text-center">
					{data.result}
				</td> */}
				{/* <td className="py-4 px-6 text-white whitespace-nowrap font-normal text-base border-r  border-dark-0 text-center">
					{data.testcases.length}
				</td> */}
				<td className="py-4 px-6 text-white whitespace-nowrap font-normal text-base border-r  border-dark-0 text-center">
					{getStatus(data.score)}
				</td>
				<td className="py-4 px-6 text-white whitespace-nowrap font-normal text-base  border-dark-0 text-center">
					<TextButton
						color="primary"
						size="small"
						onClick={() => setIsOpen(true)}
					>
						View
					</TextButton>
				</td>
			</tr>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-70" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-3xl bg-dark-5 p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-bold leading-6 text-white flex items-center"
									>
										<span className="flex-1">Submissions</span>
										<TextButton
											color="secondary"
											size="normal"
											onClick={closeModal}
										>
											<FontAwesomeIcon icon={faXmark} />
										</TextButton>
									</Dialog.Title>

									<Tab.Group>
										<Tab.List>
											{['Code', 'Result'].map((tab) => (
												<Tab key={tab} className="focus:outline-none">
													{({ selected }) => (
														<span
															className={`inline-block text-base font-normal py-2 px-4 border-b-2 ${
																selected
																	? 'text-primary border-primary'
																	: 'text-light-1 border-primary-extradark'
															}`}
														>
															{tab}
														</span>
													)}
												</Tab>
											))}
										</Tab.List>
										<Tab.Panels>
											<Tab.Panel>
												<div className="mt-4 h-96">
													<Editor
														theme="vs-dark"
														defaultLanguage={data.language}
														defaultValue={window.atob(data.solution.source)}
														options={{
															readOnly: true,
														}}
													/>
												</div>
											</Tab.Panel>
											<Tab.Panel>
											<div className="mt-4 h-96">
												<SubmissionResultTab submissionData={data as TSubmission<'submit'>}/>
											</div>
											</Tab.Panel>
										</Tab.Panels>
									</Tab.Group>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
