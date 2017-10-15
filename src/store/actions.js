/**
 * Created by C on 2017/9/11.
 */
// export default{
//   showHeader: ({commit}) => {
//     commit('showHeader')
//   }
// }
import * as types from './mutation-types'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FUU_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const saveSearchHistory = function ({commit, state}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory = function ({commit, state}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({commit, state}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
