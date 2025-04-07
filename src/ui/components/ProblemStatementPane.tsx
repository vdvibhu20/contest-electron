import IContent from '../types/IContent';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import IContentTag from '../types/IContentTag';

type ProblemStatementPaneProps = {
	data: IContent;
	fullScreen?: boolean;
};

const getCompanyTags = (tags: IContentTag[]) => {
	return tags.filter((t) => t.tag.domains.includes('company'));
};

export default function ProblemStatementPane({
	data,
	fullScreen,
}: ProblemStatementPaneProps) {
	return (
		<div
			className={`bg-dark-1 p-7 space-y-6 h-full overflow-y-scroll border-dark-4 ${
				fullScreen ? 'border-x' : 'border-4 rounded-3xl'
			}`}
		>
			<h1 className="text-white font-bold text-2xl">{data.problem?.name}</h1>

			{data.createdBy && (
				<div>
					<p className="font-normal text-xs text-light-2">Contributed by</p>
					<p className="flex items-center pt-2">
						{/* eslint-disable */}
						<img
							className="w-6 h-6 rounded-full"
							src={data.createdBy.photo}
							alt="User image"
						/>
						<span className="font-normal text-base text-white pl-2">
							{data.createdBy.name}
						</span>
					</p>
				</div>
			)}

			<p className="font-normal text-base text-light-2">
				<ReactMarkdown
					rehypePlugins={[rehypeRaw]}
					components={{
						p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
					}}
				>
					{data.problem ? data.problem.content?.description : ''}
				</ReactMarkdown>
			</p>

			{/* Input format */}
			{data.problem?.content?.input_format ? (
				<div>
					<p className="font-bold text-base text-white pb-2">Input format</p>
					<p className="font-mono text-[0.92rem] text-light-1 bg-dark-2 rounded-lg p-4">
					<ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
  }}
>
							{data.problem ? data.problem?.content.input_format : ''}
						</ReactMarkdown>
					</p>
				</div>
			) : null}

			{/* Output format */}
			{data.problem?.content?.output_format ? (
				<div>
					<p className="font-bold text-base text-white pb-2">Output format</p>
					<p className="font-mono text-[0.92rem] text-light-1 bg-dark-2 rounded-lg p-4">
					<ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
  }}
>
							{data.problem ? data.problem?.content.output_format : ''}
						</ReactMarkdown>
					</p>
				</div>
			) : null}

			{/* Sample Input */}
			{data.problem?.content?.sample_input &&
			data.problem?.content.sample_output ? (
				<div>
					<p className="font-bold text-base text-white pb-2">Example 1</p>
					<div className="bg-dark-2 rounded-lg p-4 space-y-2">
						<p className="font-bold text-base text-white">Input</p>
						<p className="font-mono text-[0.92rem] text-light-1">
						<ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
  }}
>
								{data.problem ? data.problem?.content.sample_input : ''}
							</ReactMarkdown>
						</p>
						<p className="font-bold text-base text-white">Output</p>
						<p className="font-mono text-[0.92rem] text-light-1">
						<ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
  }}
>
								{data.problem ? data.problem?.content.sample_output : ''}
							</ReactMarkdown>
						</p>
						{data.problem?.content.explanation ? (
							<>
								<p className="font-bold text-base text-white">Explanation</p>
								<p className="font-mono text-[0.92rem] text-light-1">
								<ReactMarkdown
  rehypePlugins={[rehypeRaw]}
  components={{
    p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
  }}
>
										{data.problem ? data.problem?.content.explanation : ''}
									</ReactMarkdown>
								</p>
							</>
						) : null}
					</div>
				</div>
			) : null}

			{/* Constraints */}
			{data.problem?.content?.constraints ? (
				<div>
					<p className="font-bold text-base text-white pb-2">Constraints</p>
					<p className="font-mono text-[0.92rem] text-light-1 bg-dark-2 rounded-lg p-4">
						<ReactMarkdown
							rehypePlugins={[rehypeRaw]}
							components={{
								p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
							}}
						>
							{data.problem ? data.problem?.content.constraints : ''}
						</ReactMarkdown>
					</p>
				</div>
			) : null}

			{/* Company logos */}
			{getCompanyTags(data.contentTags).length > 0 ? (
				<div>
					<p className="font-bold text-base text-white mb-2">Asked in</p>
					<div className="flex items-center flex-wrap gap-y-3 gap-x-3">
						{getCompanyTags(data.contentTags).map(({ tag }) => (
							<img key={tag.id} src={tag.logo} className="h-6 aspect-auto" />
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}
