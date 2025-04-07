import { ReactNode, useEffect} from "react";

interface IProps {
  children: ReactNode
  triggered: boolean;
  setTriggered: (val: boolean) => void;
  classes?: string;
  duration?: number;
}

export default function Pulse({duration = 2500, classes, triggered = false, setTriggered, children}: IProps) {

  useEffect(() => {
    if(triggered) {
      setTimeout(() => {setTriggered(false)}, duration)
    }
  }, [triggered])
  return (
    <>
    {triggered &&
      <span className={classes}>{children}</span>
    }
    </>
  )
}