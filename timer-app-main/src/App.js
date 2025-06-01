import "./App.css";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handleStop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleRestart = useCallback(() => {
    setTime(0);
    setIsRunning(false); // Also stop the timer when restarting
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="section">
      <div className="timer-wrapper">
        <h2 className="title">Timer</h2>
        <span className="time">{formatTime(time)}</span>
        <div className="buttons-group">
          <button
            className="button-start"
            onClick={handleStart}
            disabled={isRunning}
          >
            START
          </button>
          <button
            className="button-stop"
            onClick={handleStop}
            disabled={!isRunning}
          >
            STOP
          </button>
          <button className="button-restart" onClick={handleRestart}>
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
