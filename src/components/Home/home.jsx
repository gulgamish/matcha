import { useQuery } from "@apollo/client";
import { Person, DateRange, GpsFixed } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import client from "../../client";
import { USERS } from "../../GraphQl/Match/Queries";
import Search from './SearchBar/Search'
import Card from "./Card/Card";
import "./style.css"



export default function () {
  var [users, setUsers] = useState([
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22,
      interests: [
        "vegan",
        "geek"
      ],
      fameRating: 20
    },
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22,
      interests: [
        "vegan",
        "geek"
      ],
      fameRating: 24
    },
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22,
      interests: [
        "vegan",
        "geek"
      ],
      fameRating: 90
    },
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22,
      interests: [
        "vegan",
        "geek"
      ],
      fameRating: 50
    },
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22,
      interests: [
        "vegan",
        "geek"
      ],
      fameRating: 50
    }
  ]);
  var { loading, data } = useQuery(USERS);

  if (!loading)
    console.log(data);

  useEffect(() => {
    
  }, []);

  return (
    <div className="home-container">
      <Search />
      <div className="users">
        {
          !loading && data.browseUsers.map(user => (
            <Card
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              age={user.age}
              distance={user.distance}
              interests={user.interests}
              fameRating={user.score}
              image={user.profilePicture}
            />
          ))
        }
      </div>
    </div>
  );
}
