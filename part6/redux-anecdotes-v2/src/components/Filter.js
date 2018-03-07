import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = event => {
    this.props.filter(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}
const mapDispatchToProps = {
  filter
}

export default connect(null, mapDispatchToProps)(Filter)
