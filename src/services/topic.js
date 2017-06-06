import {
  http
} from '@xhs/launcher'

function getTopics() {
  return http.get('TOPICS')
}

function postTopic(payload) {
  const data = {
    title: payload.title,
    content: payload.content
  }

  return http.post('TOPICS', data)
}

function putTopic(payload) {
  const data = {
    title: payload.title,
    content: payload.content
  }

  return http.put('TOPICS', data, {
    resourceId: payload.id
  })
}

function deleteTopic(payload) {
  return http.del('TOPICS', {
    resourceId: payload.id
  })
}

export default {
  getTopics,
  postTopic,
  putTopic,
  deleteTopic
}
