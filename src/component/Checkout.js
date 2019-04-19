import {getCart} from '../actions/index'
import React,{Component} from 'react'
import {connect} from 'react-redux'

export default class Checkout extends Component{
  constructor(){
    super()

    this.state={
      formValue:['aba']
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

  render(){
    const {loading}=this.props.goods
    const {checkout}=this.props.goods
    const {total}=this.props.goods

    let rendered
    if(loading===false){
      rendered=(<div style={{flexdirection:'column',padding:20}}>
            {checkout.map((data,indeks)=>
                <div style={{flexdirection:'column',padding:40}} key={indeks}>
                  <h1 key={indeks}>Invoice to {data.seller}</h1>
                  {data.item.map((data,i)=>
                    <div key={i}>
                        <p style={{fontWeight:'bold'}}>Name : {data.detailBarang.name}</p>
                        <p>  Harga : {data.detailBarang.price}</p>
                        <p>  qty : {data.quantity}</p>
                        <p style={{fontWeight:'bold'}}>Subtotal :{this.formatRupiah(data.sub_total,'Rp.')}</p>
                    </div>
                  )}
                  <h2 style={{fontWeight:'bold'}}>Total Belanja :{this.formatRupiah(data.total_belanjaan,'Rp.')}</h2>
                </div>
              )}
              <h1>Total Spend: {this.formatRupiah(total,'Rp.')}</h1>
            </div>)
    }
    else{
      rendered=<p>Now Loading....</p>
    }
    return(
      <div style={{display:'flex',flexdirection:'column'}}>
        {rendered}
      </div>
    )
  }

}
const mapDispatchToProps = {
    getcart:getCart
  };

const mapStateToProps = (state) => ({goods:state.goods,auth:state.auth.token})

Checkout=connect(mapStateToProps,mapDispatchToProps)(Checkout)
