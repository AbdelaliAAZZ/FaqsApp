import { useState } from "react";

function Accordion({ todo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isOpen ? `item open` : `item`}>
      <p className="number">0{todo.id}</p>
      <p className="title">{todo.title}</p>
      <p className="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "-" : "+"}
      </p>
      {isOpen ? <div className="content-box">{todo.text}</div> : ""}
    </div>
  );
}

export default Accordion;
