import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccCoverage from '../VaccinationCoverage'
import VaccByGender from '../VaccinationByGender'
import VaccByAge from '../VaccinationByAge'

import './index.css'

const ApiConstants = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    sevendaysvacc: [],
    vaccbyage: [],
    vaccbygender: [],
    apistatus: ApiConstants.intial,
  }

  componentDidMount() {
    this.getcowindetails()
  }

  getcowindetails = async () => {
    this.setState({apistatus: ApiConstants.intial})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()

      this.setState({
        apistatus: ApiConstants.success,
        sevendaysvacc: data.last_7_days_vaccination,
        vaccbyage: data.vaccination_by_age,
        vaccbygender: data.vaccination_by_gender,
      })
    } else {
      this.setState({apistatus: ApiConstants.failure})
    }
  }

  RenderSuccessPage = () => {
    const {vaccbyage, vaccbygender, sevendaysvacc} = this.state

    return (
      <div>
        <VaccCoverage sevendaysvacc={sevendaysvacc} />
        <VaccByGender vaccbygender={vaccbygender} />
        <VaccByAge vaccbyage={vaccbyage} />
      </div>
    )
  }

  RenderLoader = () => (
    <div data-testid="loader" className="failurecontainer">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  RenderFailurePage = () => (
    <div className="failurecontainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureimgpx"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  RenderPage = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case ApiConstants.intial:
        return this.RenderLoader()
      case ApiConstants.success:
        return this.RenderSuccessPage()
      case ApiConstants.failure:
        return this.RenderFailurePage()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgcontainer">
        <div className="logoheadingcontainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logoimgpx"
          />
          <h1 className="cowinheading">Co-WIN</h1>
        </div>
        <h1 className="cowinheading">CoWIN Vaccination in India</h1>

        {this.RenderPage()}
      </div>
    )
  }
}

export default CowinDashboard
