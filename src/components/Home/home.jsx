import { useQuery } from "@apollo/client";
import { Card, CardActionArea, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import { Person, DateRange, GpsFixed } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import client from "../../client";
import { USERS } from "../../GraphQl/match/Queries";
import Search from './Search'

var useStyles = makeStyles({
  media: {
    height: "150px",
  },
  card: {
    width: "250px",
    marginLeft: '10px',
    marginRight: '10px',
    border: 'none'
  },
});

export default function () {
  var classes = useStyles();
  var [users, setUsers] = useState([
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22
    },
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22
    },
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22
    },
    {
      firstName: "ayman",
      lastName: "elamrani",
      age: 24,
      distance: 30.22
    }
  ]);
  var { loading, data } = useQuery(USERS);

  if (!loading)
    console.log(data);

  useEffect(() => {
    
  }, []);

  return (
    <div className="home-container">
      <div className="search">
        <Search />
      </div>
      <div className="users">
        
      </div>
    </div>
  );
}
