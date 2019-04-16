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
  }
}
