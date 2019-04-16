import { combineReducers } from 'redux'
import {dogReducer} from './dog'
import {goodsReducer} from './goods'

export const rootReducer = combineReducers(
                {
                  dog: dogReducer, goods: goodsReducer
                }
              )
