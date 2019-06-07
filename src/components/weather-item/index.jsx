import React from "react";
import "./index.scss";
import { isNumber } from "util";

const WeatherItem = (props) =>  (
    <div className="weather-item">
      {/* <p>{`${props.num ? props.num + 1 : ''}. ${props.name}`}</p> */}
      <p>{isNumber(props.num) ? `${props.num + 1}. ${props.name}` : props.name } </p>
      <p>{`${props.temp} °`}</p>
      <p>{`${props.humidity} %`}</p>
      { props.wIcon ? <img src={`http://openweathermap.org/img/w/${props.wIcon}.png`} /> : <p /> }
    </div>
)

export default WeatherItem;