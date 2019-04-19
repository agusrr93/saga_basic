module.exports={
  sendText:function(){
    return {
      type:'SEND_TEXT',
      payload:'INI TEXT SAYA PERUBAHAN SEKARANG'
    }
  },
  fetchPeople:function(){
    return {type:'GET_PEOPLE'}
  },
  fetchGoods:function(){
    return {type:'GET_GOODS'}
  },
  authPeople:function(payload){
    return {type:'AUTH_PEOPLE',payload:payload}
  },
  fetchDetail:function(payload){
    return {type:'FETCH_DETAIL',payload:payload}
  },
  setloading:function(){
    return {type:'SET_LOADING'}
  },
  addToCart:function(payload){
    return {type:'ADD_TO_CART',payload:payload}
  },
  getCart:function(payload){
    return {type:'GET_CART',payload:payload}
  },
  getCheckout:function(payload){
    return {type:'GET_CHECKOUT',payload:payload}
  }
}
