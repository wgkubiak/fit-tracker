import React, { Component } from "react";
import "./App.css";
import Measures from "./components/containers/Measures";
import Daily from "./components/containers/Daily";
import CreateDaily from "./components/forms/UpdateDailyForm";
import Header from "./components/navs/Header";
import Proteges from "./components/containers/Proteges";
import ListP from "./components/containers/ListP";
import utils from "./utils/constants"

class App extends Component {
  
  render() {
    return (
      <div className="container">
        {<Header />}
        {utils.switchMainSite && <Proteges />}
        {utils.switchMainSite && <Measures />}
        {utils.switchMainSite && <CreateDaily />}
        {utils.switchMainSite &&  <Daily />}
        {!utils.switchMainSite && <ListP />} 
      </div>
    );
  }
}

export default App;
