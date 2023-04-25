// src/client/Root.js

import React from "react";
import App from '../App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';



const Root = () => (
  <BrowserRouter>
      <App/>
  </BrowserRouter>
);

export default Root;