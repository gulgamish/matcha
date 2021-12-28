import { useQuery } from "@apollo/client";
import { Person, DateRange, GpsFixed, SentimentDissatisfied, SentimentVeryDissatisfied } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { USERS, USERS_SORTED_FILTRED } from "../../GraphQl/Match/Queries";
import Search from './SearchBar/Search'
import Card from "./Card/Card";
import "./style.css"
import Display from "../Display-user/Display";
import { Backdrop } from "@material-ui/core"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import Clear from "./Clear/Clear"
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../GraphQl/Match/Queries";
import axios from "axios";
import { useUserContext } from "../../user.wrapper";

export default function () {
  const { user } = useUserContext();
  const [ users, setUsers ] = useState([]);
  const [ originalUsers, setOriginalUsers ] = useState([]);
  const [ browse, { loading, data, refetch } ] = useLazyQuery(USERS_SORTED_FILTRED);
  const [ open, setOpen ] = useState(false);
  const [ userData, setUserData ] = useState(null);
  const [ userDataLoading, setUserDataLoading ] = useState(false);
  const [ clear, setClear ] = useState(false);

  // useEffect(() => {
  //   if (!loading && data.browseUsers) {
  //     console.log(data.browseUsers);
  //     setUsers(data.browseUsers);
  //     //setOriginalUsers(data.browseUsers);
  //   }
  // }, [data]);

  console.log(data, loading);

  useEffect(() => {
    console.log("enter here ?");
    browse();
  }, [])


  const fetchUser = (id) => {
    setUserDataLoading(true)
    axios.post('/graphql' , {
      query: `
        query checkProfile (
          $id: ID
        ) {
          checkProfile (
              profileId: $id
          ) {
              id
              firstName
              lastName
              username
              distance
              gender
              biography
              score
              sexualPreference
              age
              interests
              profilePicture
              regularPictures
              liked
              lastSeen
          }
        }
      `,
      variables: {
        id
      }
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(({ data }) => {
      setUserData(data.data.checkProfile);
    })
    .catch(err => {})
    .finally(() => setUserDataLoading(false));
  }

  return (
    <div className="home-container">
      <Search users={users} setUsers={setUsers} clear={clear} setClear={setClear} browse={browse} />
      <div className="users">
        {
          !loading && data != undefined && (data.browseUsers.length > 0 ? data.browseUsers.map(user => {
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
                  fetchUser(user.id);
                  setOpen(true);
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
        data={userData}
        loading={userDataLoading}
      />
      <AdvancedSearch
        setUsers={setUsers}
      />
      <Clear
        onClick={() => {
          refetch();
          setClear(true);
        }}
      />
    </div>
  );
}
