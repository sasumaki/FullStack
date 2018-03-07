import React from 'react'
import { connect } from 'react-redux'
class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    let notification = this.props.notification
    return (
      <div style={style}>
        <p> {notification}</p>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    notification: state.notifications
  }
}

export default connect(mapStateToProps)(Notification)
