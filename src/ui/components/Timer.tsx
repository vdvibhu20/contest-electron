import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

interface IProps {
  endTime: Date
  onTimerEnd?: () => void
}

export default function Timer({ endTime, onTimerEnd }: IProps) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,

  } = useTimer({
    expiryTimestamp: endTime,
  });

  useEffect(() => {
    if (!isRunning && onTimerEnd) {
      onTimerEnd()
    }
  }, [isRunning])

  return (
    <div className="text-primary flex">
      <div className="text-center">
        {days}
        <br />
        <span className="text-xs inline-block translate-y-[-0.5rem]">{days > 1 ? 'days' : 'day'}</span>
      </div>
      <span className="mx-1">:</span>
      <div className="text-center">
        {hours}
        <br />
        <span className="text-xs inline-block translate-y-[-0.5rem]">{hours > 1 ? 'hrs' : 'hr'}</span>
      </div>
      <span className="mx-1">:</span>
      <div className="text-center">
        {minutes}
        <br />
        <span className="text-xs inline-block translate-y-[-0.5rem]">{minutes > 1 ? 'mins' : 'min'}</span>
      </div>
      <span className="mx-1">:</span>
      <div className="text-center">
        {seconds}
        <br />
        <span className="text-xs inline-block translate-y-[-0.5rem]">{seconds > 1 ? 'secs' : 'sec'}</span>
      </div>

    </div>
  )
}