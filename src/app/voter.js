import React from "react";
import { render } from "react-dom";
import SlideBar from   "./components/SlideBar";
import Voter from "./components/SignInVoter"

render(<SlideBar/>, document.getElementById('root'));
render(<Voter/>, document.querySelector('main'));