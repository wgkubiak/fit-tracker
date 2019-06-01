import React, { Component } from "react";
import "./App.css";
import Measures from "./components/containers/Measures"
import Daily from "./components/containers/Daily"
import CreateDaily from "./components/forms/UpdateDailyForm"
import Header from "./components/navs/Header"
import Proteges from "./components/containers/Proteges"

class App extends Component {
  render() {
    return (
      <div className="container">
        {<Header />}
        {<Proteges />}
        {<Measures />}
        {<CreateDaily />}
        {<Daily />}
      </div>
    );
  }
}

export default App;
