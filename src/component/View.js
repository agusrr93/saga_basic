import React from 'react'
import {connect} from 'react-redux'
import {sendText,fetchPeople,fetchGoods} from '../actions/index'

export let Parent=({dog,goods,sendInfo,getpeople,getgoods})=>{
  return(
    <div>
        <p>DOG OR GOODS</p>
        <img
            src={dog.images}
            alt="new"
            style={{width:300}}
            resizemode='contain'
        />
        <img
          src={goods.images}
          alt="new"
          style={{width:300}}
          resizemode='contain'
        />
        <button onClick={getpeople}>Get Dog</button>
        <button onClick={getgoods}>Get Goods</button>
    </div>
  )
}
const mapDispatchToProps = {
    sendInfo: sendText,
    getpeople:fetchPeople,
    getgoods:fetchGoods
  };

const mapStateToProps = (state) => ({dog:state.dog,goods:state.goods})

Parent=connect(mapStateToProps,mapDispatchToProps)(Parent)
