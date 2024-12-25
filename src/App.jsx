import "./index.css";
import Accordions from "./Accordions";

const faqs = [
  {
    id: 1,
    title: "Where are these chairs assembled?",
    text: "Our chairs are assembled in our factory in Milan, Italy, under strict quality control standards. Each piece is handcrafted by skilled artisans with over 20 years of experience.",
  },
  {
    id: 2,
    title: "How long do I have to return my chair?",
    text: "We offer a 30-day return policy from the date of delivery. The item must be in original condition and packaging. Return shipping costs are covered for manufacturing defects.",
  },
  {
    id: 3,
    title: "Do you ship to countries outside the EU?",
    text: "Yes, we ship worldwide! Delivery times vary by location: 2-5 days within EU, 7-14 days for rest of the world. International shipping fees are calculated at checkout.",
  },
  {
    id: 4,
    title: "What materials are used in your chairs?",
    text: "We use premium materials including Italian leather, high-grade steel frames, and sustainably sourced hardwood. All materials meet EU safety and environmental standards.",
  },
  {
    id: 5,
    title: "How do I care for my leather chair?",
    text: "Clean with a damp cloth and mild soap monthly. Apply leather conditioner every 6 months. Avoid direct sunlight and heat sources. Professional cleaning recommended annually.",
  }
];

export default function App() {
  return (
    <div>
      <h1>FAQs</h1>
      <Accordions faqs={faqs} />
    </div>
  );
}
