import { useQuery } from "@apollo/client"
import React from "react"
import MatchedUser from "./match-user/MatchedUser"
import { GET_MATCHED_USERS } from "../../../GraphQl/Match/Queries"
import "./style.css"

const List = ({
    selectedUser,
    setSelectedUser
}) => {
    const { loading, data } = useQuery(GET_MATCHED_USERS, {
        
    })

    return (
        <div className="list-container">
            {
                !loading && data && (
                    data.getMatchedUsers.map((user, index) => (
                        <div key={index}>
                            <MatchedUser
                                img={user.profilePicture}
                                username={user.username}
                                onClick={() => {
                                    setSelectedUser(user.id)
                                }}
                                selected={selectedUser === user.id}
                            />
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default List;