import React from 'react'

class Menu extends React.Component {

  render() {
    return (
      <div className="menu">
        <button
          onClick={this.props.onShuffle}
        >
          shuffle
        </button>
        <button
          onClick={this.props.onSort}
        >
          sort
        </button>

        <select
          onChange={this.props.onChangeSorter}
          name="sorter"
        >
          {this.props.sorters.map(item => (
            <option
              key={item.name}
              value={ item.value }>
              { item.name }
            </option>
          ))}
        </select>

        <select
          onChange={this.props.onChangeDrawer}
          name="drawer"
        >
          {this.props.drawers.map(item => (
            <option
              key={ item.name }
              value={ item.value }>
              { item.name }
            </option>
          ))}
        </select>

        <div className="control">
          <label>Speed</label>
          <button
            onClick={() => this.props.changeSpeed('up')}
          >
            +
          </button>
          <span>
            {this.props.speed}
          </span>
          <button
            onClick={() => this.props.changeSpeed('down')}
          >
            -
          </button>
        </div>
      </div>
    )
  }
}

export default Menu