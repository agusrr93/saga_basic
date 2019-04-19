import { combineReducers } from 'redux'
import {dogReducer} from './dog'
import {goodsReducer} from './goods'
import {authReducer} from './auth'
import {detailReducer} from './detail'

export const rootReducer = combineReducers(
                {
                    dog: dogReducer, goods: goodsReducer,auth:authReducer,detail:detailReducer
                }
              )
