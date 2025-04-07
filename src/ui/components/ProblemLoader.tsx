import Split from 'react-split';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

type ProblemLoaderProps = {
  fullscreen?: boolean;
}

export default function ProblemLoader({fullscreen}: ProblemLoaderProps) {
  return (
    <Split minSize={450} className="split h-full w-full" id="problem-split">
      <div className={`${fullscreen ? 'border-x' : 'border-4 rounded-3xl'} border-dark-4 bg-dark-1 p-7`}>
        <div className="animate-pulse overflow-auto h-full">
          <h1 className="bg-dark-4 rounded-lg h-[25px] w-1/2 mb-5"></h1>
          <div className="bg-dark-4 rounded-lg h-[150px] mb-10"></div>
          <div className="bg-dark-4 rounded-lg h-[25px] w-[100px] mb-3"></div>
          <div className="bg-dark-4 rounded-lg h-[100px] mb-10" mb-10></div>
          <div className="bg-dark-4 rounded-lg h-[25px] w-[100px] mb-3"></div>
          <div className="bg-dark-4 rounded-lg h-[100px] mb-10"></div>
        </div>
      </div>
      <div className={`border-dark-4 ${fullscreen ? 'border-x' : 'border-4 rounded-3xl'} bg-dark-1 flex flex-col justify-between`}>
        <div className={`bg-dark-5 border-b border-dark-0 p-3 rounded-t-[1.24rem] flex items-center justify-between`}>
          <FontAwesomeIcon className="w-4 h-4" icon={faExpand} />
          <div className="bg-dark-4 rounded-lg h-[20px] w-[50px] animate-pulse"></div>
        </div>
        <div className={`bg-dark-5 border-t border-dark-0 rounded-b-[1.24rem] p-3 flex items-center justify-between`}>
          <div className="flex justify-between items-center animate-pulse w-full">
            <div className="bg-dark-4 rounded-lg h-[20px] w-[100px]"></div>
            <div className="flex">
              <div className="bg-dark-4 rounded-lg h-[30px] w-[100px] mx-4"></div>
              <div className="bg-dark-4 rounded-lg h-[30px] w-[100px]"></div>
            </div>
          </div>
        </div>
      </div>
    </Split>
  )
}