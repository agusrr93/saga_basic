let initial_state={
  name:'iam',
  text:'message1',
  images:"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
  loading:false
}

export const goodsReducer=(state=initial_state,action)=>{
  switch (action.type) {
    case 'GOODS_RECEIVED':
        return {...state,images:action.payload,loading:false}
    case 'GOODS_REQUEST_FAILED':
        return {...state,text:'error',loading:false}
    case 'GET_GOODS':
          return {
              ...state,loading:true,text:'ngeget goods'
          }
    default:
        return state
  }
}
