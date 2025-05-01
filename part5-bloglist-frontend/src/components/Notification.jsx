/* eslint-disable indent */
import { useSelector } from 'react-redux'

const Notification = ({ message, type }) => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null) {
    return null
  }

  return (
    <div className={notification.type} data-testid='notification'>
      {notification.message}
    </div>
  )
}


export default Notification