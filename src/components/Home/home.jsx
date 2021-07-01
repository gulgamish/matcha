import { useQuery } from "@apollo/client";
import { Person, DateRange, GpsFixed } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import client from "../../client";
import { USERS } from "../../GraphQl/Match/Queries";
import Search from './SearchBar/Search'
import Card from "./Card/Card";
import "./style.css"
import Display from "../Display-user/Display";
import { Backdrop } from "@material-ui/core"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";


export default function () {
  const [ users, setUsers ] = useState([]);
  const { loading, data } = useQuery(USERS);
  const [ open, setOpen ] = useState(false);
  const [ userId, setUserId ] = useState();

  console.log(users);

  useEffect(() => {
    if (!loading && data.browseUsers)
      setUsers(data.browseUsers)
  }, [data]);

  return (
    <div className="home-container">
      <Search users={users} setUsers={setUsers} />
      <div className="users">
        {
          users.map(user => {
            if (user)
              return <Card
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                age={user.age}
                distance={user.distance}
                interests={user.interests}
                fameRating={user.score}
                image={user.profilePicture}
                onClick={() => {
                  setOpen(true);
                  setUserId(user.id);
                }}
              />
          })
        }
        
      </div>
      <Display
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        userId={userId}
      />
      <AdvancedSearch
        setUsers={setUsers}
      />
    </div>
  );
}
