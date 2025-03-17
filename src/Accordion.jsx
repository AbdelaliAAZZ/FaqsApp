

function Accordion({index,text,title,isOpen,handleOpen }) {



     


  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={()=>handleOpen(index)}>
      <p className="number">0{index+1}</p>
      <p className="title">{title}</p>
      <p className="icon" >
        {isOpen ? "-" : "+"}
      </p>
      {isOpen ? <div className="content-box">{text}</div> : ""}
    </div>
  );
}

export default Accordion;
