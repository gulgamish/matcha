import React, { useEffect, useState } from "react"
import { NotificationsNone } from "@material-ui/icons";
import clsx from "clsx";
import "./style.css"
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { NEW_NOTIFICATION } from "../../GraphQl/Match/Subscriptions";
import { GET_NOTIFICATIONS } from "../../GraphQl/Match/Queries";
import { READ_NOTIFICATIONS } from "../../GraphQl/Match/Mutations";
import useAlert from "../tools/useAlert";

const Notifications = () => {
    const { SnackBar, setAlert } = useAlert();
    const { loading, data } = useSubscription(NEW_NOTIFICATION, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            });
        }
    });
    const {
        data: dataNotifications,
        loading: loadingNotification,
    } = useQuery(GET_NOTIFICATIONS, {
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: err.message
            });
        }
    });
    const [ readNotifications ] = useMutation(READ_NOTIFICATIONS);
    const [ redNotif, setRedNotif ] = useState(false);
    const [ notificationCounter, setNotificationCounter ] = useState(null);
    const [ notifications, setNotifications ] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const onWindowClick = (e) => {
            setShowMenu(false);
        }
        window.addEventListener("click", onWindowClick);
        return () => {
            window.removeEventListener("click", onWindowClick);
        }
    }, []);

    useEffect(() => {
        setNotificationCounter(notifications.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ notifications ])

    useEffect(() => {
        if (!loading) {
            if (data && data.newNotification) {
                setRedNotif(true);
                setNotifications([
                    ...notifications,
                    data.newNotification.message
                ]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (!loadingNotification) {
            var notifs = dataNotifications.getNotifications.map(({ message }) => message);
            setNotifications([
                ...notifications,
                ...notifs
            ])
            if (notifs.length > 0)
                setRedNotif(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataNotifications])

    return (
        <div className="menu-notif-container" onClick={e => e.stopPropagation()}>
            <div
                className="notif-icon-btn"
                onClick={() => {
                    setShowMenu(!showMenu);
                    setRedNotif(false);
                    readNotifications();
                }}
            >
                <div className={clsx("notif-signal", {
                    activeNotif: redNotif
                })}>
                    <div>{notificationCounter}</div>
                </div>
                <div className="notif-icon">
                    <NotificationsNone />
                </div>
            </div>
            <div className={clsx("menu-notif-content", {
                block: showMenu
            })}>
                <div className="notif-container">
                    {notifications.map(notification => (
                        <div className="notification">
                            {notification}
                        </div>
                    ))}
                </div>
            </div>
            <SnackBar />
        </div>
    )
}

export default Notifications;