// import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="failure-container">
    <img
      src="https://ik.imagekit.io/sps1un6dc/covid19dashboard/Group_7484covidFailureView.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670340203857"
      alt="not-found-pic"
      className="failure-img"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>we’re sorry, the page you requested could not be found</p>
    <p>Please go back to the homepage</p>
    <Link to="/" className="nav-link">
      <button type="button" className="nf-home-btn">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
