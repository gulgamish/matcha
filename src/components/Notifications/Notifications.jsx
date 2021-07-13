import React, { useEffect, useRef, useState } from "react"
import { Divider, MenuList, MenuItem } from "@material-ui/core";
import { NotificationsNone } from "@material-ui/icons";
import clsx from "clsx";
import "./style.css"
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { NEW_NOTIFICATION } from "../../GraphQl/Match/Subscriptions";
import { GET_NOTIFICATIONS } from "../../GraphQl/Match/Queries";
import { READ_NOTIFICATIONS } from "../../GraphQl/Match/Mutations";

const Notifications = () => {
    const { loading, data, error } = useSubscription(NEW_NOTIFICATION);
    const {
        data: dataNotifications,
        loading: loadingNotification,
        error: errorNotifications
    } = useQuery(GET_NOTIFICATIONS);
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
    }, [dataNotifications])

    console.log(notifications, redNotif);

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
        </div>
    )
}

export default Notifications;