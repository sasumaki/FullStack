import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    let notification = this.props.store.getState().notifications
    console.log(notification)
    return (
      <div style={style}>
        <p> {notification}</p>
      </div>
    )
  }
}

export default Notification
