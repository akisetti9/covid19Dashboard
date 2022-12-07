import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Header from '../Header'
import Footer from '../Footer'
import NotFound from '../NotFound'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    stats: [],
    isAsc: true,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    confirmed: 0,
    deceased: 0,
    recovered: 0,
    tested: 0,
    population: 0,
    active: 0,
  }

  componentDidMount() {
    this.getHomeData()
  }

  getHomeData = async () => {
    const {statesList} = this.props
    const {isAsc} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      this.setState({apiStatus: apiStatusConstants.success})
      const fetchedData = await response.json()
      const resultList = []
      //   getting keys of an object object
      const keyNames = Object.keys(fetchedData)

      const stateCodes = statesList.map(each => each.state_code)

      const updatedKeys = keyNames.filter(each => stateCodes.includes(each))

      const finalKeys = isAsc ? updatedKeys.sort() : updatedKeys.reverse()

      finalKeys.forEach(keyName => {
        if (fetchedData[keyName]) {
          const {total} = fetchedData[keyName]
          //   if the state's covid data is available we will store it or we will store 0
          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = fetchedData[keyName].meta.population
            ? fetchedData[keyName].meta.population
            : 0

          const newStats = {
            stateCode: keyName,
            name: statesList.find(each => each.state_code === keyName)
              .state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          }
          resultList.push(newStats)
        }
      })

      let totalConfirmed = 0
      let totalDeceased = 0
      let totalRecovered = 0
      let totalTested = 0
      let totalPopulation = 0
      let totalActive = 0

      resultList.forEach(stateData => {
        totalConfirmed += stateData.confirmed
        totalDeceased += stateData.deceased
        totalRecovered += stateData.recovered
        totalTested += stateData.tested
        totalPopulation += stateData.population
        totalActive += stateData.active
      })
      this.setState({
        stats: resultList,
        confirmed: totalConfirmed,
        deceased: totalDeceased,
        recovered: totalRecovered,
        tested: totalTested,
        population: totalPopulation,
        active: totalActive,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onAscKeys = () => {
    this.setState({isAsc: true}, this.getHomeData)
  }

  onDescKeys = () => {
    this.setState({isAsc: false}, this.getHomeData)
  }

  onEnterSearch = event => {
    this.setState({searchInput: event.target.value})
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

  renderSuccessView = () => {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            placeholder="Enter the State"
            className="search-input"
            value={searchInput}
            onChange={this.onEnterSearch}
          />
        </div>

        {searchInput.length > 0
          ? this.renderSearchResults()
          : this.renderStats()}
      </>
    )
  }

  renderStats = () => {
    const {
      stats,
      confirmed,
      active,
      recovered,
      deceased,
      tested,
      population,
    } = this.state
    console.log(tested, population)
    return (
      <>
        <div className="stats">
          <div className="confirmed-stat">
            <p className="stat-name">Confirmed</p>
            <img
              src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/Groupconfirmed.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901387"
              alt="confirmed"
              className="thumb-img"
            />
            <p className="stat-value">{confirmed}</p>
          </div>

          <div className="active-stat">
            <p className="stat-name">Active</p>
            <img
              src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/protection_1active.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901404"
              alt="active"
              className="thumb-img"
            />
            <p className="stat-value">{active}</p>
          </div>

          <div className="recovered-stat">
            <p className="stat-name">Recovered</p>
            <img
              src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/recovered_1recovered.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901476"
              alt="recovered"
              className="thumb-img"
            />
            <p className="stat-value">{recovered}</p>
          </div>

          <div className="deceased-stat">
            <p className="stat-name">Deceased</p>
            <img
              src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/breathing_1deceased.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901284"
              alt="deceased"
              className="thumb-img"
            />
            <p className="stat-value">{deceased}</p>
          </div>
        </div>

        <div className="state-wise-data">
          <div className="column-names">
            <div className="state-column-container">
              <p className="state-column-name">State/UT</p>
              <button
                type="button"
                className="filter-btn"
                onClick={this.onAscKeys}
              >
                <FcGenericSortingAsc />
              </button>
              <button
                type="button"
                className="filter-btn"
                onClick={this.onDescKeys}
              >
                <FcGenericSortingDesc />
              </button>
            </div>
            <p className="confirmed-column-name">Confirmed</p>
            <p className="active-column-name">Active</p>
            <p className="recovered-column-name">Recovered</p>
            <p className="deceased-column-name">Deceased</p>
            <p className="population-column-name">Population</p>
          </div>
          <hr className="break-line" />
          {/* StatesList */}
          {stats.map(each => (
            <div className="list-container" key={each.stateCode}>
              <p className="state-detail">{each.name}</p>
              <p className="confirmed-detail">{each.confirmed}</p>
              <p className="active-detail">{each.active}</p>
              <p className="recovered-detail">{each.recovered}</p>
              <p className="deceased-detail">{each.deceased}</p>
              <p className="population-detail">{each.population}</p>
            </div>
          ))}
        </div>

        <Footer />
      </>
    )
  }

  renderSearchResults = () => {
    const {statesList} = this.props
    const {searchInput} = this.state
    const updatedList = statesList.filter(each =>
      each.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <>
        <div className="search-results-container">
          {updatedList.map(each => (
            <div className="search-list-item" key={each.state_code}>
              <p>{each.state_name}</p>
              <Link to={`/state/${each.state_code}`} className="nav-link">
                <button type="button" className="goto-container">
                  <p className="goto-code">{each.state_code}</p>
                  <img
                    src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/Linegoto.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670409007046"
                    alt="goto icon"
                  />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="53.3" width="53.3" />
    </div>
  )

  renderFailureView = () => <NotFound />

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderResult()}
      </div>
    )
  }
}

export default Home
