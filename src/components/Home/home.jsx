import { SentimentVeryDissatisfied } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Search from './SearchBar/Search'
import Card from "./Card/Card";
import "./style.css"
import Display from "../Display-user/Display";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import Clear from "./Clear/Clear"
import axios from "axios";
import { useUserContext } from "../../user.wrapper";

const Home = () => {
  const { user } = useUserContext();
  const [ users, setUsers ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ userData, setUserData ] = useState(null);
  const [ userDataLoading, setUserDataLoading ] = useState(false);
  const [ usersDataLoading, setUsersDataLoading ] = useState(true);
  const [ clear, setClear ] = useState(false);

  const fetchUsers = (orderBy, filterBy) => {
    axios.post('/graphql', {
      query: `
        query browse (
          $orderBy: OrderByInput,
          $filterBy: FilterByInput
        ) {
          browseUsers (
              orderBy: $orderBy
              filterBy: $filterBy
          ) {
              id,
              firstName,
              lastName,
              age,
              distance,
              interests,
              profilePicture,
              score
          }
        }
      `,
      variables: {
        orderBy,
        filterBy
      }
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(({ data }) => {
      setUsers(data.data.browseUsers);
    })
    .catch(err => {})
    .finally(() => setUsersDataLoading(false));
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Search users={users} setUsers={setUsers} clear={clear} setClear={setClear} />
      <div className="users">
        {
          (!usersDataLoading && users && users.length > 0 ?
            users.map((user, index) => {
              if (user)
                return <div key={index}> <Card
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
              </div>
            else
                return null;
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
          fetchUsers();
          setClear(true);
        }}
      />
    </div>
  );
}

export default Home;