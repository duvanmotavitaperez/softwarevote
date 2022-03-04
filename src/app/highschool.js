import React from "react";
import { render } from "react-dom";
import SlideBar from   "./components/SlideBar";
import Card from "./components/CardHighSchool"

render(<SlideBar/>, document.querySelector('main'));
render(<Card/>, document.querySelector('section'));  
