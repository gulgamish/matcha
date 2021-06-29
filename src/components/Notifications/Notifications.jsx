import React, { useEffect, useRef, useState } from "react"
import { Divider, MenuList, MenuItem } from "@material-ui/core";
import { NotificationsNone } from "@material-ui/icons";
import clsx from "clsx";
import "./style.css"
import { useQuery, useSubscription } from "@apollo/client";
import { NEW_NOTIFICATION } from "../../GraphQl/Match/Subscriptions";
import { GET_NOTIFICATIONS } from "../../GraphQl/Match/Queries";

const Notifications = () => {
    const { loading, data, error } = useSubscription(NEW_NOTIFICATION);
    const {
        data: dataNotifications,
        loading: loadingNotification,
        error: errorNotifications
    } = useQuery(GET_NOTIFICATIONS);
    const [ redNotif, setRedNotif ] = useState(false);
    const [ notifications, setNotifications ] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const onWindowClick = (e) => {
            if (e.target != menuRef.current) {
                setShowMenu(false);
            }
        }
        window.addEventListener("click", onWindowClick);
        return () => {
            window.removeEventListener("click", onWindowClick);
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log(data);
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
        }
    }, [dataNotifications])

    console.log(notifications, redNotif);

    return (
        <div className="menu-notif-container">
            <div
                className="notif-icon-btn"
                onClick={() => {
                    setShowMenu(!showMenu);
                    setRedNotif(false);
                }}
            >
                <div className={clsx("notif-signal", {
                    activeNotif: redNotif
                })} />
                <div className="notif-icon">
                    <NotificationsNone  ref={menuRef} />
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