import {
  http
} from '@xhs/launcher'

function getTopics() {
  return http.get('TOPICS')
}

function postTopics(payload) {
  const data = payload

  return http.post('TOPICS', data)
}

export default {
  getTopics,
  postTopics
}
