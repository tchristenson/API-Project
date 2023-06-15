import { csrfFetch } from "./csrf";

// ------------------------------------ ACTIONS ------------------------------------
const REQUEST_MEMBERSHIP = 'memberships/requestMembership'
const DELETE_MEMBERSHIP = 'memberships/deleteMembership'
const GET_MEMBERS_BY_GROUP = 'memberships/getMembersByGroup'

const requestMembershipAction = (membershipStatus) => {
    return {
        type: REQUEST_MEMBERSHIP,
        membershipStatus
    }
}

const deleteMembershipAction = (membershipId) => {
    return {
        type: DELETE_MEMBERSHIP,
        membershipId
    }
}

const getMembersByGroupAction = members => {
    return {
        type: GET_MEMBERS_BY_GROUP,
        members
    }
}

// ------------------------------------ THUNKS ------------------------------------
export const requestMembershipThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        const membershipStatus = await response.json()
        console.log('membershipStatus response from backend', membershipStatus)
        dispatch(requestMembershipAction(membershipStatus))
        return membershipStatus
    }
}

export const deleteMembershipThunk = (groupId, memberId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership/${memberId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (response.ok) {
        const deletedMembership = response.json()
        dispatch(deleteMembershipAction(deletedMembership.id))
        return deletedMembership
    }
}

export const getMembersByGroupThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`)
    if (response.ok) {
        const members = await response.json()
        dispatch(getMembersByGroupAction(members))
        return members
    }
}


// ------------------------------------ REDUCER ------------------------------------
const membershipReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case REQUEST_MEMBERSHIP:
            newState = {...state}
            console.log('action.membershipStatus inside reducer', action.membershipStatus)
            newState[action.membershipStatus.id] = action.membershipStatus
            return newState
        case DELETE_MEMBERSHIP:
            newState = {...state}
            delete newState[action.membershipId]
            return newState
        case GET_MEMBERS_BY_GROUP:
            const updatedMembers = action.members.Members.reduce((acc, member) => {
                acc[member.id] = member;
                return acc;
              }, {});
            return {
            ...updatedMembers
            };

            // newState = {...state}
            // action.members.Members.forEach(member => newState[member.id] = member)
            // return newState
        default:
            return state
    }
}

export default membershipReducer
