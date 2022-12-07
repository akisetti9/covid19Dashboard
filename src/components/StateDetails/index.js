import {Component} from 'react'
import Header from '../Header'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class StateDetails extends Component {
  state = {
    stateLatest: {},
    stateDateWise: [],
    districtsLatest: [],
    districtsDateWise: [],
    apiStatus: apiStatusConstants.initial,
    selectedStateCode: '',
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    this.setState({
      selectedStateCode: stateCode,
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const stateKey = Object.keys(fetchedData)
      const dates = Object.keys(fetchedData[stateKey].dates)
      //* latest state data
      const lastDate = dates.reverse()[0]
      const latestStateData = {
        date: lastDate,
        confirmed: fetchedData[stateKey].dates[lastDate].total.confirmed,
        deceased: fetchedData[stateKey].dates[lastDate].total.deceased,
        recovered: fetchedData[stateKey].dates[lastDate].total.recovered,
        tested: fetchedData[stateKey].dates[lastDate].total.tested,
        vaccinated1: fetchedData[stateKey].dates[lastDate].total.vaccinated1,
        vaccinated2: fetchedData[stateKey].dates[lastDate].total.vaccinated2,
      }
      //* Date wise state data
      const dateWiseReceivedStateData = []
      dates.forEach(date => {
        const {
          confirmed,
          deceased,
          recovered,
          tested,
          vaccinated1,
          vaccinated2,
        } = fetchedData[stateKey].dates[date].total
        dateWiseReceivedStateData.push({
          date,
          confirmed,
          deceased,
          recovered,
          tested,
          vaccinated1,
          vaccinated2,
        })
      })

      //* DISTRICT DATA
      const districts = Object.keys(fetchedData[stateKey].districts)
      const districtsLatestReceivedData = []
      const districtWiseReceivedDailyData = []
      districts.forEach(district => {
        const districtDates = Object.keys(
          fetchedData[stateKey].districts[district].dates,
        )
        //* approach-1
        if (districtDates.length > 0) {
          const districtLastDate = districtDates.reverse()[0]
          const {
            confirmed,
            deceased,
            recovered,
            tested,
            vaccinated1,
            vaccinated2,
          } = fetchedData[stateKey].districts[district].dates[
            districtLastDate
          ].total
          const districtWiseReceivedLatestData = {
            district,
            date: districtLastDate,
            confirmed,
            deceased,
            recovered,
            tested,
            vaccinated1,
            vaccinated2,
          }
          districtsLatestReceivedData.push(districtWiseReceivedLatestData)
        }
        //* approach-2
        const dateWiseReceivedDistrictData = []
        districtDates.forEach(date => {
          const {
            confirmed,
            deceased,
            recovered,
            tested,
            vaccinated1,
            vaccinated2,
          } = fetchedData[stateKey].districts[district].dates[date].total
          dateWiseReceivedDistrictData.push({
            date,
            confirmed,
            deceased,
            recovered,
            tested,
            vaccinated1,
            vaccinated2,
          })
        })
        districtWiseReceivedDailyData.push({
          district,
          data: dateWiseReceivedDistrictData,
        })
      })

      //* Changing State
      this.setState({
        stateLatest: latestStateData,
        stateDateWise: dateWiseReceivedStateData,
        districtsLatest: districtsLatestReceivedData,
        districtsDateWise: districtWiseReceivedDailyData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {
      stateLatest,
      stateDateWise,
      districtsLatest,
      districtsDateWise,
      apiStatus,
      selectedStateCode,
    } = this.state
    console.log(
      stateLatest,
      stateDateWise,
      districtsLatest,
      districtsDateWise,
      apiStatus,
    )
    let stateName
    if (selectedStateCode !== '') {
      stateName = statesList.find(each => each.state_code === selectedStateCode)
        .state_name
    }
    return (
      <>
        <Header />
        <div className="state-details-container">
          <div>
            <h1>{stateName}</h1>
            <p>Last update on march 28th 2021.</p>
          </div>
        </div>
      </>
    )
  }
}

export default StateDetails
