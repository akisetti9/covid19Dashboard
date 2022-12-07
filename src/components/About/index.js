import {Component} from 'react'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {faqs: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getFaqData()
  }

  getFaqData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    if (response.ok) {
      this.setState({apiStatus: apiStatusConstants.success})
      const fetchedData = await response.json()
      this.setState({faqs: [...fetchedData.faq]})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {faqs, apiStatus} = this.state
    console.log(faqs, apiStatus)
    return (
      <>
        <Header />
        <div className="about-container">
          <h1 className="about-title">About</h1>
          <p className="about-date">Last updated on march 28th 2021.</p>
          <p className="about-notes">
            COVID-19 vaccines be ready for distribution
          </p>
          {faqs.map(each => (
            <div className="faq-container" key={each.qno}>
              <p className="faq-question">{each.question}</p>
              <p className="faq-answer">{each.answer}</p>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default About
