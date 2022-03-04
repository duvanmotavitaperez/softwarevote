import React from "react";
import { render } from "react-dom";
import SlideBar from   "./components/SlideBar";
import Card from "./components/School"

render(<SlideBar/>, document.querySelector('main'));
render(<Card/>, document.querySelector('section'));  