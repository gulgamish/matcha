import { Avatar, CircularProgress, Dialog, Divider } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import "./style.css"
import { useUserContext } from "../../user.wrapper";
import Display from "../Display-user/Display"


export const Who = ({
    open,
    setWho,
    title,
    users
}) => {
    const [ data, setData ] = useState();
    const [ loading, setLoading ] = useState(true);
    const { user } = useUserContext();
    const [ openDisplay, setOpen ] = useState(false);
    const [ usr, setUser ] = useState(null);

    useEffect(() => {
        if (open) {
            var fetches = users.map((elem) => {
                return axios.post("/graphql", {
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
                            id: elem.id
                        }
                    }, {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    })
            });
            Promise.all(fetches)
                .then(res => {
                    setData(res);
                })
                .finally(() => setLoading(false));
        }
    }, [open, users, user.token])


    if (open)
        return (
            <Dialog fullWidth open={open} onClose={() => {
                setWho((value) => {
                    return { ...value, open: false }
                })
                setData([]);
                setLoading(true);
            }}>
                <Display open={openDisplay} handleClose={() => setOpen(false)} data={usr} loading={false}  />
                <div className="wrapper">
                    <div className="title">
                        {title}
                    </div>
                    <div className="content">
                        {loading ? (
                            <div className="center">
                                <CircularProgress />
                            </div>
                        ) : (
                            data && data.map(elem => {
                                if (elem.data.data.checkProfile) {
                                    return (
                                        <div key={elem.data.data.checkProfile.id}>
                                            <div className="user" onClick={() => {
                                                setOpen(true);
                                                setUser(elem.data.data.checkProfile);
                                            }}>
                                                <Avatar src={elem.data.data.checkProfile.profilePicture} />
                                                <span>{elem.data.data.checkProfile.firstName} {elem.data.data.checkProfile.lastName}</span>
                                            </div>
                                            <Divider />
                                        </div>
                                        )
                                } else {
                                    return null
                                }
                                    
                            })

                        )}
                    </div>
                </div>
            </Dialog>
        )
    return null;
}