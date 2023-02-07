import './index.css'

const FaqItem = prop => {
  const {faq} = prop
  const {qno, question, answer} = faq
  return (
    <li className="faq-container" key={qno}>
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </li>
  )
}

export default FaqItem
