import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import NotFound from '../NotFound'

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

  renderLoadingView = () => (
    <>
      <Header />
      <div testid="aboutRouteLoader" className="loader-container">
        <Loader type="TailSpin" color="#0b69ff" height="53.3" width="53.3" />
      </div>
    </>
  )

  renderFailureView = () => <NotFound />

  renderSuccessView = () => {
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
          <ul testid="faqsUnorderedList" className="faq-lists-container">
            {faqs.map(each => (
              <li className="faq-container" key={each.qno}>
                <p className="faq-question">{each.question}</p>
                <p className="faq-answer">{each.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderResult()
  }
}

export default About
