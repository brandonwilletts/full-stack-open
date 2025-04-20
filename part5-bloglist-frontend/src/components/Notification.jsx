const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className} data-testid='notification'>
      {message}
    </div>
  )
}

export default Notification