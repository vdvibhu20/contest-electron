export default function QuizContentLoader() {
  return (
    <div className="animate-pulse flex flex-wrap h-full">
      <div className="w-4/6 p-10 h-full overflow-scroll">
        <span className="w-3/6 h-6 mb-6 inline-block rounded-lg mr-3 bg-dark-2"></span>
        <span className="w-1/6 h-6 block rounded-lg mr-3 bg-dark-2"></span>
        <div className="w-full h-36 bg-dark-2 rounded-lg mt-5"></div>
        <div className="">
          <div className="my-4">
            <span className="w-[20px] h-[20px] inline-block rounded-full mr-3 bg-radial-gradient-grey"></span>
            <span className="w-3/6 h-6 inline-block rounded-lg mr-3 bg-dark-2"></span>
          </div>
          <div className="my-4">
            <span className="w-[20px] h-[20px] inline-block rounded-full mr-3 bg-radial-gradient-grey"></span>
            <span className="w-3/6 h-6 inline-block rounded-lg mr-3 bg-dark-2"></span>
          </div>
          <div className="my-4">
            <span className="w-[20px] h-[20px] inline-block rounded-full mr-3 bg-radial-gradient-grey"></span>
            <span className="w-3/6 h-6 inline-block rounded-lg mr-3 bg-dark-2"></span>
          </div>
          <div className="my-4">
            <span className="w-[20px] h-[20px] inline-block rounded-full mr-3 bg-radial-gradient-grey"></span>
            <span className="w-3/6 h-6 inline-block rounded-lg mr-3 bg-dark-2"></span>
          </div>
        </div>
      </div>
      <div className="w-2/6 px-4 pt-10 h-full overflow-scroll relative before-border-left">
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
        {/* @ts-ignore */}
          {Array.from(Array(30)).map((id, i) => (
            <div key={i}
              className="w-[40px] h-[40px] cursor-pointer m-2 rounded-full text-center pt-2.5 bg-dark-2">
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}