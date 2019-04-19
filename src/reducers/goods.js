let initial_state={
  name:'iam',
  text:'message1',
  images:"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
  data:[],
  loading:false,
  cart:[],
  error:'nothing',
  form:[],
  total:'',
  checkout:[]
}

export const goodsReducer=(state=initial_state,action)=>{
  switch (action.type) {
    case 'GOODS_RECEIVED':
        return {...state,images:action.payload[1].photos[0],loading:false,data:action.payload}
    case 'GOODS_REQUEST_FAILED':
        return {...state,text:'error',loading:false,error:'error getting list of goods'}
    case 'GET_GOODS':
          return {
              ...state,loading:true,text:'ngeget goods'
          }
    case 'GET_CART':
          return {
             ...state,loading:true
          }
    case 'GET_CART_SUCCESS':
          return {
              ...state,cart:action.payload.cart,loading:false,form:action.payload.form
          }
    case 'GET_CART_FAILED':
          return {
              ...state,loading:false,error:'error getting user cart'
          }
    case 'GET_CHECKOUT':
          return {
              ...state,loading:true
          }
    case 'GET_CHECKOUT_SUCCESS':
          return {
              ...state,loading:false,checkout:action.payload.data,total:action.payload.total
          }
    case 'GET_CHECKOUT_FAILED':
          return {
              ...state,loading:false,error:'error getting user transaction'
          }
    default:
        return state
  }
}
