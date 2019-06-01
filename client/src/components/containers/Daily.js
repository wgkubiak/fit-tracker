import React, { Component } from "react";
import * as rb from "react-bootstrap";
import "./../../App.css"
import utils from "./../../utils/constants"

class Daily extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dailyResponse: []
      };
    }
  
    getDailies() {
      fetch(`http://localhost:9000/daily/${utils.i}`)
        .then(res => res.json())
        .then(res => this.setState({ dailyResponse: res }))
        .catch(err => err);
    }
  
    componentDidMount() {
      this.getDailies();
    }
  
    resultMessage = (demand, burned, daily) => {
      let temp = demand + burned - daily;
      if (temp < -50) {
        return "Wymaga poprawy - za dużo kcal";
      } else if (temp > 50) {
        return "Wymaga poprawy - za mało kcal";
      } else return "Idealnie";
    };
  
    render() {
      return (
        <div className="daily">
          {this.state.dailyResponse.map(resp => (
            <div className="proteges">
              <rb.Card
                className="text-center"
                bg="dark"
                text="white"
                style={{ width: "100%" }}
              >
                <rb.Card.Header>
                  (ID: {resp.idd}) Ostatni dzień pomiarowy ({resp.dailydate.slice(0, -14)})
                </rb.Card.Header>
                <rb.Card.Body>
                  <p>
                    {" "}
                    Spożyte kcal: {resp.dailykcal} Spalone kcal: {resp.burnedkcal}{" "}
                  </p>
                  <p>
                    {" "}
                    Rezultat: {resp.kcaldemand + resp.burnedkcal - resp.dailykcal}
                    kcal{" "}
                  </p>
                  <p>
                    {" "}
                    {this.resultMessage(
                      resp.kcaldemand,
                      resp.burnedkcal,
                      resp.dailykcal
                    )}{" "}
                  </p>
                </rb.Card.Body>
              </rb.Card>
            </div>
          ))}
          <br />
        </div>
      );
    }
  }

  export default Daily