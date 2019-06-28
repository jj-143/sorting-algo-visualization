import * as d3 from 'd3'

export function doStep(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const DEFAULT_OPT = {
  width: 1400,
  height: 700,
  animationDuration: 300,
  animationMarkerDelay: 300
}

class Drawer{
  constructor ({ width,height, animationDuration,animationMarkerDelay } = DEFAULT_OPT){
    this.svgWidth = width
    this.svgHeight = height
    this.animationDuration = animationDuration
    this.animationMarkerDelay = animationMarkerDelay
  }

  initDrawer(array){
    d3.select('svg')
    .attr('height', this.svgHeight)
    .attr('width', this.svgWidth)
  }

  drawUpdate(){
  }


  reset() {
    d3.selectAll('rect').remove()
  }
}

class BarGraphDrawer extends Drawer{
  constructor (props) {
    super(props)

    this.rectWidth = 20
  }

  initDrawer(array){
    super.initDrawer()
    
    this.rectWidth = parseInt(this.svgWidth / array.length)

    array.forEach((item, i) => {
      const k = (i + 1) / array.length
      item.height = this.svgHeight * k
      item.fill = d3.interpolateViridis(k)
    })

    var arr=d3.select('svg').selectAll('rect')
      .data(array)

    arr.enter().append('rect')
      .attr('x', (d,i) => i * this.rectWidth)
      .attr('y', d => this.svgHeight - d.height)
      .attr('height', d => d.height)
      .attr('width', this.rectWidth)
      .attr('fill', d => d.fill)
  }

  getColorWithMarks(i, markerIndices, color) {
    return markerIndices.includes(i) ? 'red' : color
  }

  drawUpdate(array, markerIndices = null){
    var arr = d3.select('svg')
      .selectAll('rect')
      .data(array)

    arr = arr.merge(arr)
      .attr('x', d => d.x * this.rectWidth)
      .attr('y', d => this.svgHeight - d.height)
      .attr('height', d => d.height)

    if (markerIndices) {
      arr.attr('fill', (d,i)=> this.getColorWithMarks(i, markerIndices, d.fill))
    } else {
      arr.attr('fill', d => d.fill)
    }

    arr.transition()
      .duration(this.animationDuration)
      .delay(this.animationMarkerDelay)
      .attr('x', (d,i) => i * this.rectWidth)
  }
}

export default {
  BarGraphDrawer
}
