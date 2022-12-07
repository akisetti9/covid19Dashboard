import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <div className="header-container">
      <Link to="/" className="nav-link">
        <h1 className="website-logo-text">
          COVID19<span className="website-span">INDIA</span>
        </h1>
      </Link>
      <div className="nav-tools">
        <Link to="/" className="nav-link">
          <p className="selected-route">Home</p>
        </Link>
        <Link to="/about" className="nav-link">
          <p className="normal-route">About</p>
        </Link>
      </div>
    </div>
  )
}
