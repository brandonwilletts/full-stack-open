interface NotificationProps {
	notification: string
}

const Notification = (props: NotificationProps) => {
	if (!props.notification) {
		return null
	}
	return (
		<div style={{color: "red"}}>
			{props.notification}
		</div>
	)
}

export default Notification