import "./App.css"
import axios from "axios"
import Paper from "@material-ui/core/Paper"
import React, { useEffect, useState } from "react"
import {
  Chart,
  Title,
  Legend,
  Tooltip,
  ValueAxis,
  // ZoomAndPan,
  AreaSeries,
  ArgumentAxis,
} from "@devexpress/dx-react-chart-material-ui"

import { ValueScale, EventTracker } from "@devexpress/dx-react-chart"
import { Typography } from "@material-ui/core"

function App() {
  const [btcData, addNewData] = useState([])
  const [targetItem, changeTargetItem] = useState(undefined)
  // const [viewport, changeViewport] = useState(undefined)

  // const viewportChange = (viewport) => changeViewport(viewport)
  const targetChange = (targetItem) => changeTargetItem(targetItem)

  useEffect(() => {
    const formatTime = (time) => {
      var date = new Date(time * 1000)
      var hours = date.getHours()
      var minutes = "0" + date.getMinutes()
      var seconds = "0" + date.getSeconds()
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
      return formattedTime
    }

    axios.get("https://api.cryptonator.com/api/ticker/btc-usd").then((res) => {
      let newData = {
        price: parseFloat(res.data.ticker.price) % 9200,
        timeStamp: formatTime(res.data.timestamp),
      }
      addNewData((btcData) => [...btcData, newData])
    })

    setInterval(() => {
      axios
        .get("https://api.cryptonator.com/api/ticker/btc-usd")
        .then((res) => {
          let newData = {
            price: parseFloat(res.data.ticker.price) % 9200,
            timeStamp: formatTime(res.data.timestamp),
          }
          addNewData((btcData) => [...btcData, newData])
        })
    }, 30000)
    //eslint-disable-next-line
  }, [])

  return (
    <div className="App" style={{ marginLeft: "50px", marginRight: "50px" }}>
      <Paper>
        <Chart data={btcData}>
          <ValueScale name="price" />
          <ArgumentAxis />
          <ValueAxis scaleName="price" />
          <AreaSeries
            name="BTC-USD"
            valueField="price"
            scaleName="price"
            argumentField="timeStamp"
          />

          <Legend />
          <Title text="QuillHashTask" />
          {/* <ZoomAndPan viewport={viewport} onViewportChange={viewportChange} /> */}

          <EventTracker />
          <Tooltip targetItem={targetItem} onTargetItemChange={targetChange} />
        </Chart>

        <Typography variant="caption">
          y-axis = price + 9200, x-axis = time
        </Typography>
      </Paper>
      <Typography variant="caption">
        Please Wait for 30 sec for getting second updated point as cryptonator
        api updates every 30 sec
      </Typography>
    </div>
  )
}

export default App
