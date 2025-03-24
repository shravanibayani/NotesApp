const Notification = ({ msg, type }) => {
    if (msg === null) {
        return null;
    }

    let notificationStyle = "p-3 rounded-md text-white text-center mb-4";

    switch (type) {
        case 'error':
            notificationStyle += " bg-red-600";
            break;
        case 'success':
            notificationStyle += " bg-green-600";
            break;
        case 'warning':
            notificationStyle += " bg-yellow-400 text-gray-800";
            break;
        default:
            notificationStyle = "";
    }

    return (
        <div className={notificationStyle}>
            {msg}
        </div>
    );
}

export default Notification;
