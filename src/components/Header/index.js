import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    const {match} = this.props
    const {path} = match
    console.log(path)
    const classNameForHome =
      path === '/about' ? 'normal-route' : 'selected-route'
    const classNameForAbout =
      path === '/about' ? 'selected-route' : 'normal-route'
    return (
      <div className="header-container">
        <Link to="/" className="nav-link">
          <h1 className="website-logo-text">
            COVID19<span className="website-span">INDIA</span>
          </h1>
        </Link>
        <div className="nav-tools">
          <Link to="/" className="nav-link">
            <p className={classNameForHome}>Home</p>
          </Link>
          <Link to="/about" className="nav-link">
            <p className={classNameForAbout}>About</p>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
