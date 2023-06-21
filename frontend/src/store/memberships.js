import { csrfFetch } from "./csrf";

// ------------------------------------ ACTIONS ------------------------------------
const REQUEST_MEMBERSHIP = 'memberships/requestMembership'
const DELETE_MEMBERSHIP = 'memberships/deleteMembership'
const GET_MEMBERS_BY_GROUP = 'memberships/getMembersByGroup'
const CHANGE_MEMBER_STATUS = 'memberships/changeMemberStatus'

const requestMembershipAction = (membershipStatus) => {
    return {
        type: REQUEST_MEMBERSHIP,
        membershipStatus
    }
}

const deleteMembershipAction = (members) => {
    return {
        type: DELETE_MEMBERSHIP,
        members
    }
}

const getMembersByGroupAction = members => {
    return {
        type: GET_MEMBERS_BY_GROUP,
        members
    }
}

const changeMemberStatusAction = (member) => {
    return {
        type: CHANGE_MEMBER_STATUS,
        member
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
    console.log('groupId and memberId inside thunk ---->', groupId, memberId)
    const response = await csrfFetch(`/api/groups/${groupId}/membership/${memberId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (response.ok) {
        const updatedMembers = await response.json()
        console.log('updatedMembers response from backend', updatedMembers)
        dispatch(deleteMembershipAction(updatedMembers))
        return updatedMembers
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

export const changeMemberStatusThunk = (groupId, member) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members/${member.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: member.memberId,
          status: member.Membership.status
        }),

    })
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
            const updatedMembers = action.members.Members.reduce((acc, member) => {
                acc[member.id] = member;
                return acc;
              }, {});
            return {
            ...updatedMembers
            };
        case GET_MEMBERS_BY_GROUP:
            const groupMembers = action.members.Members.reduce((acc, member) => {
                acc[member.id] = member;
                return acc;
              }, {});
            return {
            ...groupMembers
            };
        case CHANGE_MEMBER_STATUS:
            newState = {...state}
            newState[action.member.id] = action.member
            return newState
        default:
            return state
    }
}

export default membershipReducer
