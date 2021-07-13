import { useQuery } from "@apollo/client";
import { Person, DateRange, GpsFixed, SentimentDissatisfied, SentimentVeryDissatisfied } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { USERS } from "../../GraphQl/Match/Queries";
import Search from './SearchBar/Search'
import Card from "./Card/Card";
import "./style.css"
import Display from "../Display-user/Display";
import { Backdrop } from "@material-ui/core"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import Clear from "./Clear/Clear"


export default function () {
  const [ users, setUsers ] = useState([]);
  const [ originalUsers, setOriginalUsers ] = useState([]);
  const { loading, data } = useQuery(USERS);
  const [ open, setOpen ] = useState(false);
  const [ userId, setUserId ] = useState(null);

  console.log(users);

  useEffect(() => {
    if (!loading && data.browseUsers) {
      setUsers(data.browseUsers);
      setOriginalUsers(data.browseUsers);
    }
  }, [data]);

  return (
    <div className="home-container">
      <Search users={users} setUsers={setUsers} />
      <div className="users">
        {
          !loading && (users.length > 0 ? users.map(user => {
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
                  console.log("user id: ", user.id);
                  setUserId(user.id);
                }}
              />
          }) : (
            <div className="no-match">
              <div className="icon">
                <SentimentVeryDissatisfied fontSize="large" />
              </div>
              <p>No match found</p>
            </div>
          )
          )}
        
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
      <Clear
        onClick={() => {
          setUsers(originalUsers);
        }}
      />
    </div>
  );
}
