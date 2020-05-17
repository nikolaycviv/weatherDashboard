import React from 'react'
import DailyForecast from './DailyForecast'

export default ({ weatherForecastList }) => (
  <div className="row">
    <div className="col">
      <div className="card-deck home-page-card-deck text-center">
        {weatherForecastList.length && weatherForecastList.map((item, index) => (
          <DailyForecast key={index} dailyForecast={item}/>
        ))}
      </div>
    </div>
  </div>
)
