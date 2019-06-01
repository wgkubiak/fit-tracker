import React, { Component } from "react";
import "./../../App.css";
import utils from "./../../utils/constants";

class Measures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measuresByIDResponse: []
    };
  }

  getMeasureByID() {
    fetch(`http://localhost:9000/measures/${utils.i}`)
      .then(res => res.json())
      .then(res => this.setState({ measuresByIDResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.getMeasureByID();
  }

  render() {
    return (
      <div className="proteges">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Pas</th>
              <th scope="col">Szyja</th>
              <th scope="col">Tłuszcz</th>
              <th scope="col">Waga</th>
            </tr>
          </thead>
          <tbody>
            {this.state.measuresByIDResponse.map(resp => (
              <tr>
                <th scope="row">{resp.measuredate.slice(0, -14)}</th>
                <td>{resp.waist}</td>
                <td>{resp.neck}</td>
                <td>{resp.bodyfat.toFixed(1)}</td>
                <td>{resp.currentweight.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Measures;
