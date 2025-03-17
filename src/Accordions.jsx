import Accordion from "./Accordion";
import { useState } from "react";
function Accordions({faqs}) {

const [currentOpen, setCurrentOpen] = useState(null);

function handleOpen(index){
  setCurrentOpen(index === currentOpen ? null : index)
}
  

  return (
    <div className="accordion">
      {faqs.map((todo,i) => (
        <Accordion 
        key={todo.title} 
        index = {i}
        title={todo.title} 
        text={todo.text}
        isOpen={currentOpen === i}
        handleOpen={()=>handleOpen(i)}
        />
      ))}
    </div>
  );
}

export default Accordions;
