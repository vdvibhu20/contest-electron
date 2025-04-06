
interface ContestProps {
  contestId: string;
  contentId: string;
}

const Contest = ({ contestId, contentId }: ContestProps) => {
  return (
    <div>
      contest 
        <h1>{contestId}</h1>
        <h1>{contentId}</h1>
    </div>
  )
}

export default Contest
