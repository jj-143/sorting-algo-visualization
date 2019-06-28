import React from 'react'

import Sorter from './libs/Sorter'
import Drawer from './libs/Drawer'

import Menu from './Menu'


const SORTERS = [
  {
    name: 'insert sort',
    value: 'insert sort',
    sorter: Sorter.InsertSorter
  }
]

const DRAWERS = [
  {
    name: 'Bar Graph',
    value: 'Bar Graph',
    drawer: Drawer.BarGraphDrawer
  },
  {
    name: 'Moving History',
    value: 'Moving History',
    drawer: Drawer.BarGraphDrawer
  }
]

const SPEED_CONFIG = {
  defaultValue: 300,
  increment: 50,
  max: 1000,
  min: 50
}

function swapArray(array, a,b){
  if(a>b){
    var t = a;
    a = b;
    b = t;
  }

  var tmp = array.splice(b,1)[0]
  array.splice(a,0,tmp)
}

class App extends React.Component {
  constructor (props) {
    super(props)

    const defaultSpeed = SPEED_CONFIG.defaultValue

    this.state = {
      speed: defaultSpeed,
      drawer: new Drawer.BarGraphDrawer(),
      sorter: new Sorter.InsertSorter(),

      nData: 20,
      dataset: []
    }

    this.initDataset()

    this.onChangeSpeed = this.onChangeSpeed.bind(this)
    this.onChangeDrawer = this.onChangeDrawer.bind(this)
    this.onChangeSorter = this.onChangeSorter.bind(this)
    
    this.onShuffle = this.onShuffle.bind(this)
    this.onSort = this.onSort.bind(this)
  }

  initDataset () {
    const dataset = []

    for (var i=0; i<this.state.nData; i++) {
      dataset.push({
        index: i
      })
    }

    this.state.dataset = dataset
  }

  onChangeDrawer (selected) {
    this.setState({
      drawer: new DRAWERS[selected.target.selectedIndex].drawer()
    })
  }

  onChangeSorter (selected) {
    this.setState({
      sorter: new SORTERS[selected.target.selectedIndex].sorter()
    })
  }

  onChangeSpeed (way) {
    const { max, min, increment } = SPEED_CONFIG
    switch (way) {
      case 'up':
        if (this.state.speed + increment > max) { return }

        this.setState({
          speed: this.state.speed + increment
        })
        break

      case 'down':
        if (this.state.speed - increment < min) { return }

        this.setState({
          speed: this.state.speed - increment
        })
        break
      default :
        return
    }

    this.state.drawer.animationDuration = this.state.speed
    this.state.drawer.animationMarkerDelay = this.state.speed
    this.state.sorter.delay = this.state.speed * 3 + 50
  }

  onShuffle () {
    const array = this.state.dataset
    for (var i=0; i<array.length; i++) {
      array[i].x = i
    }

    for(var j=0;j<3;j++){
      for (var i = 0; i<30; i++) {
      var a=parseInt(Math.random()*array.length)
      var b=parseInt(Math.random()*array.length)
      swapArray(array, a,b)
      }  
    }

    this.setState({ dataset: array })
    this.state.drawer.drawUpdate(array)
  }

  onSort () {
    this.state.sorter.drawer = this.state.drawer
    this.state.sorter.sort(this.state.dataset)
  }

  // App Cycles
  componentDidMount () {
    this.state.drawer.initDrawer(this.state.dataset)
  }

  render() {
    return (
      <div className="app">
        <Menu
          sorters={SORTERS}
          drawers={DRAWERS}
          speed={this.state.speed}
          changeSpeed={this.onChangeSpeed}
          onChangeDrawer={this.onChangeDrawer}
          onChangeSorter={this.onChangeSorter}
          onShuffle={this.onShuffle}
          onSort={this.onSort}
        />

        <div className="content">
          <svg />
        </div>
      </div>
    )
  }
}

export default App