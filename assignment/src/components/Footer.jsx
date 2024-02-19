import React from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Home.css'

const Footer = () => {
    return (


        <footer  className='footer' style={{ backgroundColor: 'skyblue', color: 'white', padding: '25px 0', marginTop: '60px', textAlign: "left" }}>
            <div style={{ margin: 'auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '80px' }} id="footer_box">
                <div className='about'>
                    <h4>About Us</h4>
                    <p>
                        Build with Innovation is a premium technology solutions provider that specializes in crafting bespoke mobile apps and e-commerce website solutions.
                    </p>
                </div>
                <div>



                    <h4>Get in Touch</h4>
                    <span>  901-902, Pearls Business Park, Netaji Subash Place, Pitampura,</span>
                    <p>New Delhi - 110034, India</p>
                    <p>800-451- 0972</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <p>Customer Service</p>
                    <p>Return Policy</p>
                    <p>Shipping & Delivery</p>

                </div>
                <div>
                    <h4>Get in Touch</h4>
                    <div  className='email' style={{ display: 'flex'}}>
                        <input type="text" placeholder="Email Address" style={{width:'100%'}}/>
                        <button style={{width:'100%'}}>Subscribe</button>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', margin: '15px 0', color: '#949494' }}>
                        <span><FaFacebookF /></span>
                        <span><FaTwitter /></span>
                        <span><FaInstagram /></span>
                        <span><FaLinkedinIn /></span>
                    </div>
                </div>
            </div>

        </footer>


    );
};

export default Footer;