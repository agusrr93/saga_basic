import { put, takeLatest, all,call } from 'redux-saga/effects';
import axios from 'axios'

function getDog(){
  return axios.get('https://dog.ceo/api/breeds/image/random')
}

function getGoods(){
  return axios.get('https://sampanhorev1.herokuapp.com/api/v1/item/all')
}

function* fetchPeople() {
  const data = yield call(getDog)
  console.log('ini data',data.data)
  if (data)
    yield put({ type: "PEOPLE_RECEIVED", payload: data.data.message});
  else
    yield put({ type: 'PEOPLE_REQUEST_FAILED',payload:'error'})
}

function* fetchGoods() {
  const data = yield call(getGoods)
  console.log(data.data.data)
  console.log('ini data',data.data)
  if (data)
    yield put({ type: "GOODS_RECEIVED", payload: data.data.data[1].photos[0]});
  else
    yield put({ type: 'GOODS_REQUEST_FAILED',payload:'error'})
}

function* actionWatcher() {
     yield takeLatest('GET_PEOPLE', fetchPeople);
     yield takeLatest('GET_GOODS', fetchGoods);
}

export default function* rootSaga() {
   yield all([
     actionWatcher(),
   ]);
}
