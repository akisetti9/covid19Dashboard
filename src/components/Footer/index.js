import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="footer-logo-text">
        COVID19<span className="footer-span">INDIA</span>
      </h1>
      <p>we stand with everyone fighting on the front lines</p>
      <div className="icons-container">
        <VscGithubAlt size={48} />
        <FiInstagram size={48} />
        <FaTwitter size={48} />
      </div>
    </div>
  )
}
