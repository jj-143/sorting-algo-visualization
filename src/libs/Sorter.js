import { doStep } from './Drawer'
class Sorter {
  constructor ({delay} = {delay : 950}){
    this.delay = delay
  }

  async sort (array) {
  }
}


class InsertSorter extends Sorter {
  constructor (props) {
    super(props)
  }

  async sort(array) {
    for (var key = 1; key < array.length; key++) {
      for (let i=0; i < array.length ; i++) {
        array[i].x = i
      }

      var key_start = key
      var key_end = key

      while (key_end > 0 && (array[key_end - 1].index > array[key_start].index)) {
        key_end--;
      }

      var tmp = array.splice(key_start, 1)[0]
      array.splice(key_end, 0, tmp)

      await doStep(this.delay)

      var markerIndices = [
          key_end
      ]

      this.drawer.drawUpdate(array, markerIndices)
    }
  }
}

export default { InsertSorter }