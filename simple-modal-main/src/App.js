import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="open-button">
          open
        </button>
      ) : (
        <div className="modal">
          <p className="modal-title">
            Are you sure you want to close the modal
          </p>
          <button className="modal-button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
