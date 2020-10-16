import "./style/style.css";
import "popper.js"
import 'bootstrap/dist/css/bootstrap.css';
import 'regenerator-runtime';
import AOS from 'aos';
import 'aos/dist/aos.css';
import main from "./script/view/main.js";
import './template.html';

document.addEventListener("DOMContentLoaded", main);

AOS.init();