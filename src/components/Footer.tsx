// Footer.js
import mail from './img/correo-electronico.png';
import phone from './img/boton-de-simbolo-de-telefono.png';
import facebook from './img/facebook.png';
import x from './img/gorjeo.png';
import linkedin from './img/logotipo-de-linkedin.png';
import ig from './img/instagram.png';
import '../assets/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">ParkingLocation</div>

        </div>

        <div className="footer-section">
          <h3 className='contactanos'>Contactanos</h3>
          <section className="icons">
            <div className='infop'>
              <span className='icon'><img src={mail} alt="" className='a-icon' /></span>
              <h4 className='info1'>support@parkinglocation.com</h4>
            </div>
            <div className='infop'>
              <span className='icon'><img src={phone} alt="" className='a-icon' /></span>
              <h4 className='info1'>+57 314 844 8534</h4>
            </div>
          </section>
        </div>

        <div className="footer-section">
          <h3 className='contactanos'>Siguenos</h3>
          <div className="footer-social">
            <a href="#facebook"><img src={facebook} alt="" className='b-icon' /></a>
            <a href="#twitter"><img src={x} alt="" className='b-icon' /></a>
            <a href="#linkedin"><img src={linkedin} alt="" className='b-icon' /></a>
            <a href="#instagram"><img src={ig} alt="" className='b-icon' /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
