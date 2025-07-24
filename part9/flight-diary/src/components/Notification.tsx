interface NotificationProps {
    message: string;
}

export const Notification = (props: NotificationProps): Element => {
    if (!props.message) {
        return null
    }
    return (<div style={{color: "red", border: "1px solid red"}}>{props.message}</div>)
}