import React from 'react'
import {connect} from 'react-redux'
import {sendText,fetchPeople,fetchGoods,authPeople} from '../actions/index'
import {NavLink} from 'react-router-dom'

export let Parent=({dog,goods,sendInfo,getpeople,getgoods,authPeople})=>{
  return(
    <div>
        <div style={{margin:10}}>
            <p>DOG OR GOODS</p>
            <img
                src={dog.images}
                alt="new"
                style={{width:300,height:300}}
                resizemode='contain'
            />
            <img
              src={goods.images}
              alt="new"
              style={{width:300,height:300}}
              resizemode='contain'
            />
        </div>
        <div style={{margin:10}}>
            <button onClick={getpeople}>Get Dog</button>
            <button onClick={getgoods}>Get Goods</button>
            <button onClick={()=>{authPeople({"password": "aidrus1231",
            "email": "aidrus@test4.co.id"})}}>AUTH</button>
        </div>

        <p style={{marginTop:50}}>My Popular Goods: </p>
        <div style={{margin:10,display:'flex',flexdirection:'row',flexWrap:'wrap'}}>
            {goods.data.length>0?(
              goods.data.map((data,indeks)=>
                <div key={indeks} style={{margin:5}}>
                  <NavLink to={`/detail/${data._id}`}>
                      {data.photos[0]?
                      <img
                        src={data.photos[0]}
                        alt="new"
                        style={{width:300,height:300}}
                        resizemode='contain'
                      />:  <img
                          src={goods.images}
                          alt="new"
                          style={{width:300,height:300}}
                          resizemode='contain'
                        />}
                  </NavLink>
                  <div style={{justifyContent:'center'}}>
                     <p style={{textAlign:'center'}}>{data.name}</p>
                     <p style={{textAlign:'center'}}>Rp.{data.price}</p>
                  </div>
                </div>
              )
            ):<p>NOW LOADING...</p>}
        </div>
        <div style={{margin:10}}>
            <button>BACK</button>
            <button>NEXT</button>
        </div>
    </div>
  )
}
const mapDispatchToProps = {
    sendInfo: sendText,
    getpeople:fetchPeople,
    getgoods:fetchGoods,
    authPeople:authPeople
  };

const mapStateToProps = (state) => ({dog:state.dog,goods:state.goods})

Parent=connect(mapStateToProps,mapDispatchToProps)(Parent)
