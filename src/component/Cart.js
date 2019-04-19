import {getCart,getCheckout} from '../actions/index'
import React,{Component} from 'react'
import {connect} from 'react-redux'

export default class Cart extends Component{
  constructor(){
    super()

    this.state={
      formValue:['aba']
    }
  }
  componentDidMount(){
      this.props.getcart(this.props.auth)
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
      if (this.props !== prevProps) {
        this.setState({
          formValue:this.props.form
        })
      }
  }

  formatRupiah=(angka, prefix)=>{
    var	number_string = angka.toString(),
    sisa 	= number_string.length % 3,
    rupiah 	= number_string.substr(0, sisa),
    ribuan 	= number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
        rupiah=prefix+' '+rupiah
    }

    return rupiah
  }

  Checkout=()=>{
      let intArr=[]
      var sumwrong=0
      this.state.formValue.forEach(data=>{
          let c=data.toString()
          if(c.toLowerCase() !== c.toUpperCase()||c===''){
              sumwrong=sumwrong+1
          }

          intArr.push(parseInt(data))
      })

      if(sumwrong===0){
          this.props.getCheckout({form:intArr,token:this.props.auth})
          this.props.history.push('/checkout')
      }
  }

  handleChange=(indeks,event)=>{
      let newformValue=[...this.state.formValue]
      newformValue[indeks]=event.target.value
      this.setState({
          formValue:newformValue
      })
  }

  render(){
    const {loading}=this.props.goods
    let rendered
    if(loading===false){
      rendered=(<div style={{display:'flex',alignItems:'center',flexDirection:'column',margin:50}}>
          <button style={{width:200,height:50}} onClick={this.Checkout}>CHECKOUT NOW</button>
          <div style={{margin:10,width:300,alignItems:'center'}}>
              <p style={{fontWeight:'bold',padding:20}}>CART PAGE</p>
          </div>
          <table style={{width:1200}}>
              <tbody>
                  <tr>
                    <td style={{fontWeight:'bold',padding:20,border:"1px solid black"}}>Nama</td>
                    <td style={{fontWeight:'bold',padding:20,border:"1px solid black"}}><p>Image</p></td>
                    <td style={{fontWeight:'bold',padding:20,border:"1px solid black"}}><p>Harga</p></td>
                    <td style={{fontWeight:'bold',padding:20,border:"1px solid black"}}><p>Quantity</p></td>
                    <td style={{fontWeight:'bold',padding:20,border:"1px solid black"}}><p>Total</p></td>
                  </tr>
                  {this.props.goods.cart.map((data,indeks)=>
                      <tr key={indeks}>
                        <td style={{padding:20,border:"1px solid black"}}>{data.itemId.name}</td>
                        <td style={{padding:20,border:"1px solid black"}}><img
                            src={data.itemId.photos[0]}
                            alt="new"
                            style={{width:60,height:60}}
                            resizemode='contain'
                        /></td>
                        <td style={{padding:20,border:"1px solid black"}}><p>{this.formatRupiah(data.itemId.price,'Rp.')}</p></td>
                        <td style={{padding:20,border:"1px solid black"}}><input onChange={(e)=>this.handleChange(indeks,e)} type="text" value={this.state.formValue[indeks]}/></td>
                        <td style={{padding:20,border:"1px solid black"}}><p>{this.formatRupiah(data.qty*data.itemId.price,'Rp.')}</p></td>
                      </tr>
                    )}
            </tbody>
          </table>
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
    getcart:getCart,
    getCheckout:getCheckout
  };

const mapStateToProps = (state) => ({goods:state.goods,auth:state.auth.token,form:state.goods.form})

Cart=connect(mapStateToProps,mapDispatchToProps)(Cart)
