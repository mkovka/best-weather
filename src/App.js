import React from "react";
import "./App.scss";
import { makeRange } from "./utils/helper";
import WeatherItem from "./components/weather-item";
import Switch from "react-switch";

const appId = "b94ac741efbe97672bed04881819f2ac";
const citiesCount = 50;
const preferTemp = 21;
const preferHum = 50;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cities: [], checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  baseFetch() {
    fetch(
      `http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,${citiesCount}&appid=${appId}`
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        const list = makeRange(data.list, preferTemp, preferHum);
        this.setState({ cities: list });
      });
  }
  componentDidMount() {
    this.baseFetch();
  }

  handleChange(checked) {
    const { cities } = this.state;
    this.setState({ checked }, () => {
      let list = [];
      if (checked) {
        list = makeRange(cities, preferTemp + 1, preferHum);
      }
      else {
        list = makeRange(cities, preferTemp, preferHum);
      }
      this.setState({ cities: list });
    });
  }

  render() {
    const { cities, checked } = this.state;
    return (
      <div className="App">
        <div className="header-cont">
          <h1> The Best weather on the Earth </h1>
          <div>
            {checked ? <span>Female</span> : <span>Male</span>}
            <Switch
              onChange={this.handleChange}
              checked={checked}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#36354D"
              onColor="#DAF7A6"
            />
          </div>
        </div>
        <div className="weather-cont">
          <WeatherItem
            num={null}
            key="first-elem"
            name="City"
            humidity="Humidity"
            temp="Temp (C)"
          />
          {cities.map((item, i) => (
            <WeatherItem
              key={i}
              num={i}
              name={item.name}
              humidity={item.main.humidity}
              temp={Math.round(item.main.temp)}
              wIcon={item.weather[0].icon}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
