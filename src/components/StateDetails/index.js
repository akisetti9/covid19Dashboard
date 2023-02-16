import {Component} from 'react'
import {
  XAxis,
  BarChart,
  Bar,
  LabelList,
  LineChart,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import NotFound from '../NotFound'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const sampleDates = [
  '2021-09-12',
  '2021-09-13',
  '2021-09-14',
  '2021-09-15',
  '2021-09-16',
  '2021-09-17',
  '2021-09-18',
  '2021-09-19',
  '2021-09-20',
  '2021-09-21',
  '2021-09-22',
  '2021-09-23',
  '2021-09-24',
  '2021-09-25',
  '2021-09-26',
  '2021-09-27',
  '2021-09-28',
  '2021-09-29',
  '2021-09-30',
  '2021-10-01',
  '2021-10-02',
  '2021-10-03',
  '2021-10-04',
  '2021-10-05',
  '2021-10-06',
  '2021-10-07',
  '2021-10-08',
  '2021-10-09',
  '2021-10-10',
  '2021-10-11',
  '2021-10-12',
  '2021-10-13',
  '2021-10-14',
  '2021-10-15',
  '2021-10-16',
  '2021-10-17',
  '2021-10-18',
  '2021-10-19',
  '2021-10-20',
  '2021-10-21',
  '2021-10-22',
  '2021-10-23',
  '2021-10-24',
  '2021-10-25',
  '2021-10-26',
  '2021-10-27',
  '2021-10-28',
  '2021-10-29',
  '2021-10-30',
  '2021-10-31',
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class StateDetails extends Component {
  state = {
    selectedStat: 'confirmed',
    stateLatest: {},
    stateDateWise: [],
    districtsLatest: [],
    stateApiStatus: apiStatusConstants.initial,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLatestData()
    this.getTimelineData()
  }

  getLatestData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    this.setState({
      stateApiStatus: apiStatusConstants.inProgress,
    })
    console.log(statesList.map(each => each.state_code).includes(stateCode))
    if (statesList.map(each => each.state_code).includes(stateCode)) {
      const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
      const response = await fetch(apiUrl)
      if (response.ok) {
        const fetchedData = await response.json()
        console.log(fetchedData)
        const stateKeys = Object.keys(fetchedData)
        console.log(stateKeys)
        //* latest state data
        const stateName = statesList.find(each => each.state_code === stateCode)
          .state_name
        const latestStateData = {
          stateName,
          confirmed: fetchedData[stateCode].total.confirmed,
          active:
            fetchedData[stateCode].total.confirmed -
            fetchedData[stateCode].total.deceased -
            fetchedData[stateCode].total.recovered,
          deceased: fetchedData[stateCode].total.deceased,
          recovered: fetchedData[stateCode].total.recovered,
          tested: fetchedData[stateCode].total.tested,
          vaccinated1: fetchedData[stateCode].total.vaccinated1,
          vaccinated2: fetchedData[stateCode].total.vaccinated2,
        }

        //* Districts
        const districtsLatestReceivedData = []
        stateKeys.forEach(stateKey => {
          //   statesList.map(each => each.state_code)
          if (stateKey === stateCode) {
            const districts = Object.keys(fetchedData[stateKey].districts)
            districts.forEach(district => {
              const latestDistrictData = {
                district,
                confirmed: fetchedData[stateKey].districts[district].total
                  .confirmed
                  ? fetchedData[stateKey].districts[district].total.confirmed
                  : 0,
                active:
                  (fetchedData[stateKey].districts[district].total.confirmed
                    ? fetchedData[stateKey].districts[district].total.confirmed
                    : 0) -
                  (fetchedData[stateKey].districts[district].total.deceased
                    ? fetchedData[stateKey].districts[district].total.deceased
                    : 0) -
                  (fetchedData[stateKey].districts[district].total.recovered
                    ? fetchedData[stateKey].districts[district].total.recovered
                    : 0),
                deceased: fetchedData[stateKey].districts[district].total
                  .deceased
                  ? fetchedData[stateKey].districts[district].total.deceased
                  : 0,
                recovered: fetchedData[stateKey].districts[district].total
                  .recovered
                  ? fetchedData[stateKey].districts[district].total.recovered
                  : 0,
                tested: fetchedData[stateKey].districts[district].total.tested
                  ? fetchedData[stateKey].districts[district].total.tested
                  : 0,
                vaccinated1: fetchedData[stateKey].districts[district].total
                  .vaccinated1
                  ? fetchedData[stateKey].districts[district].total.vaccinated1
                  : 0,
                vaccinated2: fetchedData[stateKey].districts[district].total
                  .vaccinated2
                  ? fetchedData[stateKey].districts[district].total.vaccinated2
                  : 0,
              }
              districtsLatestReceivedData.push(latestDistrictData)
            })
          }
        })
        //* Changing State
        this.setState({
          stateLatest: latestStateData,
          districtsLatest: districtsLatestReceivedData,
          stateApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          stateApiStatus: apiStatusConstants.failure,
        })
      }
    } else {
      const latestStateData = {
        stateName: '',
        confirmed: 0,
        active: 0,
        deceased: 0,
        recovered: 0,
        tested: 0,
        vaccinated1: 0,
        vaccinated2: 0,
      }

      //* Districts
      const districtsLatestReceivedData = []
      const latestDistrictData = {
        district: '',
        confirmed: 0,
        active: 0,
        deceased: 0,
        recovered: 0,
        tested: 0,
        vaccinated1: 0,
        vaccinated2: 0,
      }
      districtsLatestReceivedData.push(latestDistrictData)
      //* Changing State
      this.setState({
        stateLatest: latestStateData,
        districtsLatest: districtsLatestReceivedData,
        stateApiStatus: apiStatusConstants.success,
      })
    }
  }

  getTimelineData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    if (statesList.map(each => each.state_code).includes(stateCode)) {
      const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
      const response = await fetch(apiUrl)
      if (response.ok) {
        const fetchedData = await response.json()
        console.log(2, fetchedData)
        const stateKey = Object.keys(fetchedData)
        const stateDates = Object.keys(fetchedData[stateKey].dates)
        //* DISTRICT DAILY DATA
        const dateWiseReceivedData = []
        stateDates.forEach(date => {
          const {
            confirmed,
            deceased,
            recovered,
            tested,
            vaccinated1,
            vaccinated2,
          } = fetchedData[stateKey].dates[date].total
          dateWiseReceivedData.push({
            date,
            confirmed,
            active: confirmed - deceased - recovered,
            deceased,
            recovered,
            tested,
            vaccinated1,
            vaccinated2,
          })
        })

        //* Changing State
        this.setState({
          stateDateWise: dateWiseReceivedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } else {
      //* DISTRICT DAILY DUMMY DATA
      const dateWiseReceivedData = []
      sampleDates.forEach(date => {
        dateWiseReceivedData.push({
          date,
          confirmed: 0,
          active: 0,
          deceased: 0,
          recovered: 0,
          tested: 0,
          vaccinated1: 0,
          vaccinated2: 0,
        })
      })

      //* Changing State
      this.setState({
        stateDateWise: dateWiseReceivedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onSelectStat = event => {
    this.setState({selectedStat: event.target.id})
  }

  renderDistrictsData = () => {
    const {selectedStat, districtsLatest} = this.state
    const wantedKeys = [selectedStat, 'district']
    const wantedData = districtsLatest.map(each => {
      const reqData = []
      wantedKeys.forEach(key => {
        if (each[key] === undefined) {
          reqData.push(0)
        } else if (each[key] === 'NaN') {
          reqData.push(0)
        } else {
          reqData.push(each[key])
        }
      })
      return reqData
    })
    wantedData.sort((a, b) => b[0] - a[0])
    return (
      <>
        {wantedData.map(each => (
          <p key={each[1]} className="district-item">
            {`${each[0]} `}
            <span className="district-name">{` ${each[1]}`}</span>
          </p>
        ))}
      </>
    )
  }

  renderBarGraph = () => {
    const {selectedStat, stateDateWise} = this.state
    const wantedData = stateDateWise.slice(40, 49).map(eachData => ({
      date: eachData.date,
      selectedStatValue: eachData[selectedStat],
    }))
    let barColor
    switch (selectedStat) {
      case 'confirmed':
        barColor = '#9A0E31'
        break
      case 'active':
        barColor = '#0A4FA0'
        break
      case 'recovered':
        barColor = '#216837'
        break
      case 'deceased':
        barColor = '#474C57'
        break
      default:
        break
    }
    const TopDataFormatter = props => {
      const {x, y, width, value} = props
      let result
      if (value > 100000) {
        result = `${(value / 100000).toFixed(2).toString()}L`
      } else if (value > 1000) {
        result = `${(value / 1000).toFixed(2).toString()}k`
      } else {
        result = `${value.toString()}`
      }

      return (
        <g>
          <text
            x={x + width / 2}
            y={y - 20}
            fill={barColor}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16px"
          >
            {result}
          </text>
        </g>
      )
    }

    const BottomDataFormatter = props => {
      const monthNames = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ]
      const date = new Date(props)
      return `${date.getDate()} ${monthNames[date.getMonth()]}`
    }

    return (
      <div className="bar-chart">
        <BarChart width={800} height={500} data={wantedData}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            stroke={barColor}
            tickFormatter={BottomDataFormatter}
          />
          <Bar
            dataKey="selectedStatValue"
            radius={[10, 10, 0, 0]}
            fill={barColor}
            minPointSize={5}
          >
            <LabelList dataKey="selectedStatValue" content={TopDataFormatter} />
          </Bar>
        </BarChart>
      </div>
    )
  }

  renderConfirmedGraph = () => {
    const {stateDateWise} = this.state
    const wantedData = stateDateWise.map(eachData => ({
      date: eachData.date,
      confirmed: eachData.confirmed,
    }))
    wantedData.reverse()
    // console.log(wantedData)
    const poppedData = wantedData.slice(0, 49)
    const updatedData = poppedData.map(each => ({
      date: each.date,
      Confirmed: each.confirmed,
      confirmedFTD:
        each.confirmed - wantedData[wantedData.indexOf(each) + 1].confirmed,
    }))
    // console.log(updatedData)
    const CountFormatter = count =>
      count >= 1000 ? `${(count / 1000).toString()}k` : count
    return (
      <div className="confirmed-graph">
        <LineChart width={1000} height={300} data={updatedData}>
          <XAxis dataKey="date" stroke="#9A0E31" />
          <YAxis
            dataKey="Confirmed"
            stroke="#9A0E31"
            tickFormatter={CountFormatter}
          />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="middle" align="right" />
          <Line type="monotone" dataKey="Confirmed" stroke="#9A0E31" />
        </LineChart>
      </div>
    )
  }

  renderActiveGraph = () => {
    const {stateDateWise} = this.state
    const wantedData = stateDateWise.map(eachData => ({
      date: eachData.date,
      active: eachData.active,
    }))
    wantedData.reverse()
    // console.log(wantedData)
    const poppedData = wantedData.slice(0, 49)
    const updatedData = poppedData.map(each => ({
      date: each.date,
      Active: each.active,
      activeFTD: each.active - wantedData[wantedData.indexOf(each) + 1].active,
    }))
    // console.log(updatedData)
    const CountFormatter = count =>
      count >= 1000 ? `${(count / 1000).toString()}k` : count
    return (
      <div className="active-graph">
        <LineChart width={1000} height={300} data={updatedData}>
          <XAxis dataKey="date" stroke="#007BFF" />
          <YAxis
            dataKey="Active"
            stroke="#007BFF"
            tickFormatter={CountFormatter}
          />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="middle" align="right" />
          <Line type="monotone" dataKey="Active" stroke="#007BFF" />
        </LineChart>
      </div>
    )
  }

  renderRecoveredGraph = () => {
    const {stateDateWise} = this.state
    const wantedData = stateDateWise.map(eachData => ({
      date: eachData.date,
      recovered: eachData.recovered,
    }))
    wantedData.reverse()
    // console.log(wantedData)
    const poppedData = wantedData.slice(0, 49)
    const updatedData = poppedData.map(each => ({
      date: each.date,
      Recovered: each.recovered,
      recoveredFTD:
        each.recovered - wantedData[wantedData.indexOf(each) + 1].recovered,
    }))
    // console.log(updatedData)
    const CountFormatter = count =>
      count >= 1000 ? `${(count / 1000).toString()}k` : count
    return (
      <div className="recovered-graph">
        <LineChart width={1000} height={300} data={updatedData}>
          <XAxis dataKey="date" stroke="#27A243" />
          <YAxis
            dataKey="Recovered"
            stroke="#27A243"
            tickFormatter={CountFormatter}
          />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="middle" align="right" />
          <Line type="monotone" dataKey="Recovered" stroke="#27A243" />
        </LineChart>
      </div>
    )
  }

  renderDeceasedGraph = () => {
    const {stateDateWise} = this.state
    const wantedData = stateDateWise.map(eachData => ({
      date: eachData.date,
      deceased: eachData.deceased,
    }))
    wantedData.reverse()
    // console.log(wantedData)
    const poppedData = wantedData.slice(0, 49)
    const updatedData = poppedData.map(each => ({
      date: each.date,
      Deceased: each.deceased,
      deceasedFTD:
        each.deceased - wantedData[wantedData.indexOf(each) + 1].deceased,
    }))
    // console.log(updatedData)
    const CountFormatter = count =>
      count >= 1000 ? `${(count / 1000).toString()}k` : count
    return (
      <div className="deceased-graph">
        <LineChart width={1000} height={300} data={updatedData}>
          <XAxis dataKey="date" stroke="#6C757D" />
          <YAxis
            dataKey="Deceased"
            stroke="#6C757D"
            tickFormatter={CountFormatter}
          />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="middle" align="right" />
          <Line type="monotone" dataKey="Deceased" stroke="#6C757D" />
        </LineChart>
      </div>
    )
  }

  renderTestedGraph = () => {
    const {stateDateWise} = this.state
    const wantedData = stateDateWise.map(eachData => ({
      date: eachData.date,
      tested: eachData.tested,
    }))
    wantedData.reverse()
    // console.log(wantedData)
    const poppedData = wantedData.slice(0, 49)
    const updatedData = poppedData.map(each => ({
      date: each.date,
      Tested: each.tested,
      testedFTD: each.tested - wantedData[wantedData.indexOf(each) + 1].tested,
    }))
    // console.log(updatedData)
    const CountFormatter = count =>
      count >= 1000 ? `${(count / 1000).toString()}k` : count
    return (
      <div className="tested-graph">
        <LineChart width={1000} height={300} data={updatedData}>
          <XAxis dataKey="date" stroke="#9673B9" />
          <YAxis
            dataKey="Tested"
            stroke="#9673B9"
            tickFormatter={CountFormatter}
          />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="middle" align="right" />
          <Line type="monotone" dataKey="Tested" stroke="#9673B9" />
        </LineChart>
      </div>
    )
  }

  renderStateSuccessView = () => {
    const {
      stateApiStatus,
      selectedStat,
      stateLatest,
      stateDateWise,
      districtsLatest,
      districtsDateWise,
      apiStatus,
    } = this.state
    console.log(
      stateApiStatus,
      stateDateWise,
      districtsLatest,
      districtsDateWise,
      apiStatus,
    )

    let districtsTitleClassName
    switch (selectedStat) {
      case 'confirmed':
        districtsTitleClassName = 'confirmed-districts-title'
        break
      case 'active':
        districtsTitleClassName = 'active-districts-title'
        break
      case 'recovered':
        districtsTitleClassName = 'recovered-districts-title'
        break
      case 'deceased':
        districtsTitleClassName = 'deceased-districts-title'
        break
      default:
        break
    }

    return (
      <>
        <div className="state-details-container">
          <div className="state-header-container">
            <div className="state-name-container">
              <h1 className="state-name">{stateLatest.stateName}</h1>
              <p className="last-updated">Last update on march 28th 2021.</p>
            </div>
            <div className="tested-container">
              <p className="tested">Tested</p>
              <p className="tested-count">{stateLatest.tested}</p>
            </div>
          </div>
          <div className="state-stats-container">
            <div
              testid="stateSpecificConfirmedCasesContainer"
              className="card-container"
            >
              <button
                type="button"
                className={
                  selectedStat === 'confirmed'
                    ? 'confirmed-container'
                    : 'normal-container'
                }
                onClick={this.onSelectStat}
                id="confirmed"
              >
                <p className="confirmed-stats-title">Confirmed</p>
                <img
                  src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/Groupconfirmed.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901387"
                  alt="state specific confirmed cases pic"
                />
                <p className="confirmed-stats-count">{stateLatest.confirmed}</p>
              </button>
            </div>

            <div
              testid="stateSpecificActiveCasesContainer"
              className="card-container"
            >
              <button
                type="button"
                className={
                  selectedStat === 'active'
                    ? 'active-container'
                    : 'normal-container'
                }
                onClick={this.onSelectStat}
                id="active"
              >
                <p className="active-stats-title">Active</p>
                <img
                  src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/protection_1active.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901404"
                  alt="state specific active cases pic"
                />
                <p className="active-stats-count">{stateLatest.active}</p>
              </button>
            </div>

            <div
              testid="stateSpecificRecoveredCasesContainer"
              className="card-container"
            >
              <button
                type="button"
                className={
                  selectedStat === 'recovered'
                    ? 'recovered-container'
                    : 'normal-container'
                }
                onClick={this.onSelectStat}
                id="recovered"
              >
                <p className="recovered-stats-title">Recovered</p>
                <img
                  src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/recovered_1recovered.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901476"
                  alt="state specific recovered cases pic"
                />
                <p className="recovered-stats-count">{stateLatest.recovered}</p>
              </button>
            </div>

            <div
              testid="stateSpecificDeceasedCasesContainer"
              className="card-container"
            >
              <button
                type="button"
                className={
                  selectedStat === 'deceased'
                    ? 'deceased-container'
                    : 'normal-container'
                }
                onClick={this.onSelectStat}
                id="deceased"
              >
                <p className="deceased-stats-title">Deceased</p>
                <img
                  src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/breathing_1deceased.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670345901284"
                  alt="state specific deceased cases pic"
                />
                <p className="deceased-stats-count">{stateLatest.deceased}</p>
              </button>
            </div>
          </div>
          <div className="districts-stat">
            <p className={districtsTitleClassName}>Top Districts</p>
            <div className="districts-list">{this.renderDistrictsData()}</div>
          </div>
          {this.renderBarGraph()}
        </div>
      </>
    )
  }

  renderStateLoadingView = () => (
    <div testid="stateDetailsLoader" className="loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="53.3" width="53.3" />
    </div>
  )

  renderResult = () => {
    const {stateApiStatus} = this.state
    switch (stateApiStatus) {
      case apiStatusConstants.success:
        return this.renderStateSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderStateLoadingView()
      default:
        return null
    }
  }

  renderGraphsSuccessView = () => (
    <div>
      <p className="daily-graphs">Daily Spread Trends</p>
      <div testid="lineChartsContainer">
        {this.renderConfirmedGraph()}
        {this.renderActiveGraph()}
        {this.renderRecoveredGraph()}
        {this.renderDeceasedGraph()}
        {this.renderTestedGraph()}
      </div>
    </div>
  )

  renderGraphsLoadingView = () => (
    <div testid="timelinesDataLoader" className="loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="53.3" width="53.3" />
    </div>
  )

  renderGraphsResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGraphsSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderGraphsLoadingView()
      default:
        return null
    }
  }

  renderFailureView = () => <NotFound />

  render() {
    return (
      <div className="state-details-container">
        <Header />
        {this.renderResult()}
        {this.renderGraphsResult()}
        <Footer />
      </div>
    )
  }
}

export default StateDetails
