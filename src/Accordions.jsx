import Accordion from "./Accordion";

function Accordions({ faqs }) {
  return (
    <div className="accordion">
      {faqs.map((todo) => (
        <Accordion key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default Accordions;
