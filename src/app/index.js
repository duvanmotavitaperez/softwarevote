import React from "react";
import { render } from "react-dom";
import SlideBar from   "./components/SlideBar";
import Login from "./components/Login"

render(<SlideBar/>, document.getElementById('root'));
render(<Login/>, document.querySelector('main')); 



