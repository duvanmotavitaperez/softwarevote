import React from "react";
import { render } from "react-dom";
import SlideBar from   "./components/SlideBar";
import Cardmiddle from "./components/School"

render(<SlideBar/>, document.querySelector('main'));
render(<Cardmiddle/>, document.querySelector('section'));