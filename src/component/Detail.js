import {fetchDetail,setloading,addToCart} from '../actions/index'
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

export default class Detail extends Component{
  componentDidMount(){
      this.props.setloading()
      this.props.getdetail(this.props.match.params.itemId)
  }
  render(){
    const {bought,photos,review,name,stock,tags,price,description,updatedAt}=this.props.detail.detail
    const {loading}=this.props.detail
    let rendered
    if(loading===false){
      rendered=(<div style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:50}}>
          <div style={{margin:10,width:300}}>
            <NavLink to={`/cart/${this.props.auth.token}`}>
              <button>SEE YOUR CART</button>
            </NavLink>
              <p>DETAILS PAGE</p>
              <img
                  src={photos[0]}
                  alt="new"
                  style={{width:300,height:300}}
                  resizemode='contain'
              />
              <p style={{fontWeight:'bold'}}>name : {name}</p>
              <p style={{fontWeight:'bold'}}>price : Rp. {price}</p>
              <p style={{fontWeight:'bold'}}>bought: {bought}</p>
              <p style={{fontWeight:'bold'}}>stock: {stock}</p>
              <p style={{fontWeight:'bold'}}>description: {description}</p>
              <p style={{fontWeight:'bold'}}>review: {review}</p>
              <p style={{fontWeight:'bold'}}>updatedAt: {updatedAt}</p>
              <p>tags: {tags}</p>
          </div>

          <button style={{width:300,height:40,fontWeight:'bold'}} onClick={()=>{this.props.addToCart({token:this.props.auth.token,itemId:this.props.match.params.itemId})}}>Buy Items</button>
          <button style={{width:300,height:40,fontWeight:'bold'}} onClick={()=>{this.props.getdetail(this.props.match.params.itemId)}}>WishList</button>

      </div>)
    }
    else{
      rendered=<p>Now Loading....</p>
    }
    return(
      <div>
        {rendered}
      </div>
    )
  }

}
const mapDispatchToProps = {
    getdetail:fetchDetail,
    setloading:setloading,
    addToCart:addToCart
  };

const mapStateToProps = (state) => ({auth:state.auth,detail:state.detail})

Detail=connect(mapStateToProps,mapDispatchToProps)(Detail)
