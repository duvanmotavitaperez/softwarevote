import React from "react";
import { render } from "react-dom";
import SlideBar from   "./components/SlideBar";
import Card from "./components/Card"

render(<SlideBar/>, document.getElementById('root'));
render(<Card/>, document.querySelector('main'));  
