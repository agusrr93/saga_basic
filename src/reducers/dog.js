let initial_state={
  name:'iam',
  text:'message1',
  images:"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
  loading:false
}

export const dogReducer=(state=initial_state,action)=>{
  switch (action.type) {
    case 'SEND_TEXT':
        return {
          name:'iam',
          text:action.payload,
          images:state.images
        }
    case 'PEOPLE_RECEIVED':
        return {
            ...state,
            text:action.payload,
            images:action.payload,
            loading:false
        }
    case 'PEOPLE_REQUEST_FAILED':
        return {
            ...state,
            name:'iam',
            text:action.payload,
            loading:false
        }
    case 'GET_PEOPLE':
          return {
              ...state,loading:true,text:'ngeget'
          }
    default:
        return state
  }
}
