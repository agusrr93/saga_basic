import { put, takeLatest,select, all,call } from 'redux-saga/effects';
import axios from 'axios'

function getDog(){
    return axios.get('https://dog.ceo/api/breeds/image/random')
}
function getGoods(){
  return axios.get('https://sampanhorev1.herokuapp.com/api/v1/item/all')
}
function getProfile(config){
  return axios.get('https://sampanhorev1.herokuapp.com/api/v1/user',config)
}
function loginAPI(payload){
  return axios.post('https://sampanhorev1.herokuapp.com/api/v1/public/login',payload)
}
function getDetail(payload){
  return axios.get(`https://sampanhorev1.herokuapp.com/api/v1/item/${payload}/detail`)
}

function addToCart(config){
  return axios.post(`https://sampanhorev1.herokuapp.com/api/v1/cart`,config.itemId,config.config)
}

function getCart(config){
  return axios.get(`https://sampanhorev1.herokuapp.com/api/v1/cart`,config)
}

function getCheckout(config){
  return axios.post(`http://localhost:8000/api/v1/transaction`,config.quantity,config.config)
}

function* fetchPeople() {
  const getToken = (state) =>state.auth
  const token = yield select(getToken)
  const data = yield call(getDog)
  if (data)
    yield put({ type: "PEOPLE_RECEIVED", payload: data.data.message})
  else
    yield put({ type: 'PEOPLE_REQUEST_FAILED',payload:'error'})
}

function* fetchGoods() {
    try{
          const data = yield call(getGoods)

          yield put({ type: "GOODS_RECEIVED", payload: data.data.data.docs})
    }
    catch{
          yield put({ type: "GOODS_REQUEST_FAILED", payload:'error'})
    }
}

function* authAPI(content){
  try{
      const data = yield call(loginAPI,content.payload)
      yield put({ type: "LOGIN_SUCCESS", payload: data.data.token})

      let config = {
          headers: {
            authorization:data.data.token,
          }
      }

      const hasil=yield call(getProfile,config)
      const payloads={
        "verify":hasil.data.profile.verify,
        "name":hasil.data.profile.local.username,
        "email":hasil.data.profile.local.email
      }

      yield put({ type: "GET_PROFILE_SUCCESS", payload: payloads})

  }
  catch{
     yield put({ type: 'LOGIN_FAILED',payload:'error'})
  }
}

function* detailAPI(content){
    try{
      const data=yield call(getDetail,content.payload)

      yield put({ type: "GET_DETAIL_SUCCESS", payload: data.data.data})
    }
    catch{
      yield put({ type: "GET_DETAIL_FAILED", payload: 'error'})
    }
}

function* setDetailLoading(){
   yield put({type:"SET_DETAIL_LOADING"})
}

function* userCart(content){
  let config = {
      headers: {
        authorization:content.payload.token,
      }
  }

  let itemId={
    itemId:content.payload.itemId
  }

  let configuration={
    config:config,
    itemId:itemId
  }

  try{
      const data = yield call(addToCart,configuration)
  }catch{

  }

}

function* getCartAction(content){
  let config = {
      headers: {
        authorization:content.payload,
      }
  }

  try{
      const data = yield call(getCart,config)
      let form=[]
      data.data.data.forEach(data=>{
        form.push(data.qty)
      })

      let payload={
        cart:data.data.data,
        form:form
      }
      yield put({ type: "GET_CART_SUCCESS", payload:payload })
  }
  catch{
      yield put({ type: "GET_CART_FAILED"})
  }
}

function* getCheckoutAction(content){
  let config = {
      headers: {
        authorization:content.payload.token,
      }
  }

  let Form={
      quantity:JSON.stringify(content.payload.form)
  }

  let configuration={
    config:config,
    quantity:Form
  }

  console.log(configuration)
  try{
      const data = yield call(getCheckout,configuration)
      console.log('dari saga',data.data.data)
      yield put({ type: "GET_CHECKOUT_SUCCESS", payload:data.data.data})
  }
  catch{
      yield put({ type: "GET_CHECKOUT_FAILED"})
  }
}

function* actionWatcher() {
     yield takeLatest('GET_PEOPLE', fetchPeople);
     yield takeLatest('GET_GOODS', fetchGoods);
     yield takeLatest('AUTH_PEOPLE', authAPI);
     yield takeLatest('FETCH_DETAIL', detailAPI);
     yield takeLatest('SET_LOADING', setDetailLoading);
     yield takeLatest('ADD_TO_CART',userCart);
     yield takeLatest('GET_CART',getCartAction)
     yield takeLatest('GET_CHECKOUT',getCheckoutAction)
}

export default function* rootSaga() {
   yield all([
     actionWatcher(),
   ]);
}
