export const singer = state => state.singer
export const disc = state => state.disc
export const fuuScreen = state => state.fuuScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const currentIndex = state => state.currentIndex
export const mode = state => state.mode
export const playing = state => state.playing
export const topList = state => state.topList
export const searchHistory = state => state.searchHistory
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
