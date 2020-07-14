import "./App.css"
import React from "react"
import Paper from "@material-ui/core/Paper"
import { Chart, AreaSeries } from "@devexpress/dx-react-chart-material-ui"

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
  { argument: 4, value: 11 },
  { argument: 5, value: 12 },
  { argument: 6, value: 9 },
  { argument: 7, value: 3 },
  { argument: 8, value: 30 },
]

function App() {
  return (
    <div className="App">
      <Paper>
        <Chart data={data}>
          <AreaSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    </div>
  )
}

export default App
