import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";
import { Add, Refresh } from "@material-ui/icons/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Avatar,
  Button,
  CardActions,
  Chip,
  Fab,
  Snackbar,
  TextField,
} from "@material-ui/core";
import client from "../../client";
import InterestPicture from "../../img/interest.png";
import { useUserContext } from "../../user.wrapper";
import { Alert } from "@material-ui/lab";
import { useMutation, useQuery } from '@apollo/client'
import { GET_TAGS } from '../../GraphQl/User/Queries';
import { ADD_TAG, DELETE_TAG } from "../../GraphQl/User/Mutations";
import useAlert from '../tools/useAlert'

var useStyles = makeStyles({
  tag: {
    margin: "5px 5px 5px 5px",
  },
  addInterestButton: {},
  addInterestContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  inputGroup: {
    margin: 0,
  },
  fab: {
    backgroundColor: "white",
    boxShadow: "none",
  },
});

export default function (props) {
  var [tag, setTag] = useState("");
  var classes = useStyles();
  const { SnackBar, setAlert } = useAlert();
  const { data, loading, refetch } = useQuery(GET_TAGS);
  const [ addTag ] = useMutation(ADD_TAG, {
    onError: (err) => {
      console.error(err);
    },
    onCompleted: (data) => {
      setAlert({
        open: true,
        isSucces: true,
        msg: "success"
      })
    }
  });
  const [ deleteTag ] = useMutation(DELETE_TAG, {
    onError: (err) => {
      console.error(err);
    },
    onCompleted: (data) => {
      setAlert({
        open: true,
        isSucces: true,
        msg: "success"
      })
    }
  })

  return (
    <div className="tags">
      <ul>
        {!loading && data.getUser.interests != null
          && data.getUser.interests.map(interest => {
            return (
              <li key={`interest-${interest}`}>
                <Chip
                  avatar={<Avatar src={InterestPicture} />}
                  label={interest}
                  value={interest}
                  className={classes.tag}
                  onDelete={async () => {
                    await deleteTag({
                      variables: {
                        tag: interest
                      }
                    });
                    await refetch();
                  }}
                />
              </li>
            );
          })}
      </ul>
      <div className={classes.addInterestContainer}>
        <TextField
          label="tag"
          variant="outlined"
          size="small"
          value={tag}
          onChange={e => {
            setTag(e.target.value);
          }}
        />
        <Fab
          size="small"
          className={classes.fab}
          onClick={async () => {
            if (tag != "") {
              await addTag({
                variables: {
                  tag
                }
              });
              setTag("");
              await refetch();
            }
          }}
        >
          <Add />
        </Fab>
        <SnackBar />
      </div>
    </div>
  );
}
