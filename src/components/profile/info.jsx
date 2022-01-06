import { useMutation, useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Fab,
  CircularProgress,
  FormHelperText,
  OutlinedInput
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { 
  ADD_TAG,
  DELETE_TAG,
  MODIFY_BIO,
  MODIFY_BIRTHDAY,
  MODIFY_EMAIL,
  MODIFY_FIRST_NAME,
  MODIFY_GENDER,
  MODIFY_LAST_NAME,
  MODIFY_SEXUAL_ORIENTATION
} from "../../GraphQl/User/Mutations";
import { GET_USER } from "../../GraphQl/User/Queries";
import { v_email, v_name } from "../../validation/authValidation";
import useAlert from "../tools/useAlert";
import useForm from "../tools/useForm";
import UserInputTag from "../../sub-components/UserInputTag/UserInputTag"
import { v_bio } from "../../validation/userValidations";

var useStyles = makeStyles({
  card: {
    display: "flex"
  },
  fullWidth: {
    width: "80%",
  },
  mgBottom: {
    width: "100%",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    marginBottom: "20px",
  },
  fab: {
    boxShadow: "none",
    backgroundColor: "white",
    alignSelf: "flex-end"
  },
  fabFlexEnd: {
    boxShadow: "none",
    backgroundColor: "white",
    alignSelf: "flex-end",
  },
  backdrop: {
    margin: "0 auto"
  }
});

const error = (setAlert) => (err) => {
  setAlert({
    open: true,
    isError: true,
    msg: err.message
  });
};

const success = (setAlert) => (data) => {
    setAlert({
      open: true,
      isSucces: true,
      msg: "Success"
    })
};

const Input = ({
  initial = "",
  label,
  type = "text",
  errorValidator,
  errorMessage,
  name,
  resolver,
  ...rest
}) => {
  if (initial == null)
    initial = "";
  const [ value, setValue ] = useState(initial);
  const [ error, setError ] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (
      typeof errorValidator == 'function' &&
      !errorValidator(value)
    )
      setError(true);
    else
      setError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  return (
    <div className={classes.form}>
      <FormControl
        error={error}
        variant="outlined"
        size="small"
        className={classes.fullWidth}
        required
        
      >
        <InputLabel htmlFor={label} shrink>
            {label}
        </InputLabel>
        <OutlinedInput
            type={type}
            value={value}
            label={label}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            notched
            {...rest}
        />
        {error && (
          <FormHelperText>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
      <Fab
        size="small"
        className={classes.fab}
        disabled={error || value === ""}
        onClick={() => {
          resolver({
            variables: {
              [name]: value
            }
          })
        }}
      >
        <Save />
      </Fab>
    </div>
  )
}

const SelectInput = ({
  initial = "",
  label,
  items = [],
  resolver,
  name
}) => {
  const [ value, setValue ] = useState(initial);
  const classes = useStyles();

  return (
    <div className={classes.form}>
      <FormControl
        variant="outlined"
        size="small"
        className={classes.fullWidth}
      >
        <InputLabel id={`select-${label}`}>
          {label}
        </InputLabel>
        <Select
          labelId={`select-${label}`}
          label={label}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            resolver({
              variables: {
                [name]: e.target.value
              }
            });
          }}
        >
          {
            items.map(item => (
              <MenuItem value={item} key={`item-${item}`}>
                {item}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  )
}

var Info = () => {
  var classes = useStyles();
  const { SnackBar, setAlert } = useAlert();
  const [ tags, setTags ] = useState([]);
  const { values, setValues } = useForm({
    firstName: true,
    email: true,
    lastName: true
  });
  const { loading, data } = useQuery(GET_USER, {
    onCompleted: (data) => {
      setValues(data.getUser);
      setTags(data.getUser.interests);
    }
  });

  const [ modifyFirstName ] = useMutation(MODIFY_FIRST_NAME, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  });
  const [ modifyLastName ] = useMutation(MODIFY_LAST_NAME, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  });
  const [ modifyEmail ] = useMutation(MODIFY_EMAIL, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  });
  const [ modifyBirthday ] = useMutation(MODIFY_BIRTHDAY, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  });
  const [ modifyGender ] = useMutation(MODIFY_GENDER, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  });
  const [ modifySexualOrientation ] = useMutation(MODIFY_SEXUAL_ORIENTATION, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  });
  const [ modifyBio ] = useMutation(MODIFY_BIO, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  })
  const [ addTag ] = useMutation(ADD_TAG, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  })
  const [ deleteTag ] = useMutation(DELETE_TAG, {
    onError: error(setAlert),
    onCompleted: success(setAlert)
  })

  if (loading)
    return (
      <Card className={classes.card}>
          <CircularProgress
            color="inherit"
            className={classes.backdrop}
          />
      </Card>
    )

  return (
    <Card>
      <CardContent>
        <Input
          initial={data.getUser.firstName}
          label="First Name"
          errorValidator={v_name}
          errorMessage="your first name must contain only alphabets \
                        and must not exceeds 20 characters"
          name="firstName"
          resolver={modifyFirstName}
        />
        <Input
          label="Last Name"
          initial={data.getUser.lastName}
          errorValidator={v_name}
          errorMessage="your last name must contain only alphabets \
                        and must not exceeds 20 characters"
          name="lastName"
          resolver={modifyLastName}
        />
        <Input
          label="email"
          initial={data.getUser.email}
          errorValidator={v_email}
          errorMessage="Invalid email address, ex: abc@example.com"
          name="email"
          resolver={modifyEmail}
        />
        <Input
          label="birthday"
          initial={data.getUser.birthday}
          type="date"
          name="birthday"
          resolver={modifyBirthday}
        />
        <SelectInput
          initial={data.getUser.gender == null ?
            "" : data.getUser.gender }
          label="Gender"
          items={[ "Male", "Female" ]}
          name="gender"
          resolver={modifyGender}
        />
        <SelectInput
          initial={data.getUser.sexualPreference === null ?
            "" : data.getUser.sexualPreference }
          label="Sexual Orientation"
          items={[
            "Heterosexual",
            "Homosexual",
            "Bisexual"
          ]}
          name="sexualOrientation"
          resolver={modifySexualOrientation}
        />
        <Input
          label="Biography"
          initial={data.getUser.biography}
          multiline
          rows={4}
          name="bio"
          errorValidator={v_bio}
          errorMessage="your biography must not exceeds 500 characters"
          resolver={modifyBio}
        />
        <UserInputTag
          className={classes.fullWidth}
          tags={tags}
          setTags={setTags}
          initialTags={values.interests}
          onChange={(tag) => {
            addTag({
              variables: {
                tag
              }
            });
          }}
          onTagDelete={(tag) => {
            deleteTag({
              variables: {
                tag
              }
            })
          }}
          max={6}
        />
      </CardContent>
      <SnackBar />
    </Card>
  );
};

export default Info;
