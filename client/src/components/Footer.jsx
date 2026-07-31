import {
 FaFacebook,
 FaLinkedin,
 FaTwitter
} from "react-icons/fa";

import "./Footer.css";

function Footer(){

return(

<footer className="footer">

<div>

<h3>Pharma Trade Promotion Organization</h3>

<p>
Supporting innovation in global pharmaceutical trade.
</p>

</div>

<div className="socials">

<a href="#"><FaFacebook/></a>

<a href="#"><FaLinkedin/></a>

<a href="#"><FaTwitter/></a>

</div>

</footer>

)

}

export default Footer;