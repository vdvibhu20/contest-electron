import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

import classNames from '../utils/classNames';
import TSubmission from '../types/TSubmission'

type TSubmissionResultTabProps = {
	submissionData: TSubmission<'submit'> | undefined;
};

export default function SubmissionResultTab({
	submissionData,
}: TSubmissionResultTabProps) {
	return (
		<div className="max-h-52 overflow-y-auto">
			{submissionData && submissionData.judge_result ? (
				<>
					{submissionData.judge_result.stderr ? (
						<p className="p-2 bg-dark-0 rounded-lg font-normal text-sm text-white">
							{window.atob(submissionData.judge_result.stderr)}
						</p>
					) : (
						<Tab.Group vertical>
							<div className="flex">
								<Tab.List className="flex flex-col items-end overflow-y-auto">
									{submissionData.judge_result.testcases.map(
										(t, index) => (
											<Tab key={index} className="focus:outline-none">
												{({ selected }) => (
													<span
														className={classNames(
															'border-r-2 py-2 px-4 flex items-center',
															selected
																? 'text-primary border-primary'
																: 'text-light-1 border-primary-extradark'
														)}
													>
														<span
															className={`inline-block text-base font-normal pr-2`}
														>
															Testcase {index + 1}
														</span>
														{t.result === 'Success' ? (
															<FontAwesomeIcon
																className="text-[#6CCE4B] w-4 h-4"
																icon={faCircleCheck}
															/>
														) : (
															<FontAwesomeIcon
																className="text-[#F24F60] w-4 h-4"
																icon={faCircleExclamation}
															/>
														)}
													</span>
												)}
											</Tab>
										)
									)}
								</Tab.List>
								<Tab.Panels className="flex-1">
									{submissionData.judge_result.testcases.map(
										(testCase) => (
											<Tab.Panel key={testCase.id} className="p-4 space-y-6">
												<div>
													<p className="font-bold text-sm text-white">
														Compiler Message
													</p>
													<p className="p-2 mt-2 bg-dark-0 rounded-lg font-normal text-sm text-white">
														{testCase.result}
													</p>
												</div>
												<div>
													<p className="font-bold text-sm text-white">
														Time (sec)
													</p>
													<p className="p-2 mt-2 bg-dark-0 rounded-lg font-normal text-sm text-white">
														{testCase.time}
													</p>
												</div>
												{testCase.stderr ? (
													<div>
														<p className="font-bold text-sm text-white">
															Error
														</p>
														<p className="p-2 mt-2 bg-dark-0 rounded-lg font-normal text-sm text-white">
															{testCase.stderr}
														</p>
													</div>
												) : null}
											</Tab.Panel>
										)
									)}
								</Tab.Panels>
							</div>
						</Tab.Group>
					)}
				</>
			) : null}
		</div>
	);
}
