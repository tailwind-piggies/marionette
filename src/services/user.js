import {
  get, post
} from '@xhs/launcher'

export function login(payload) {
  return post('LOGIN', payload, {
    extractData: false // for legacy api, use this prop to skip data extraction
  }).then(data => {
    if (data.code !== 200) { // for legacy api, throw error manually
      throw new Error(data.msg)
    }
    return data
  })
}

export function getUserInfo() {
  return get('USER_INFO')
}

export function logout() {
  return get('LOGOUT')
}

export function forgotPassword(payload) {
  return get('FORGOT_PASSWORD', {
    params: payload
  }, {
    extractData: false // for legacy api, use this prop to skip data extraction
  })
}

export function validateToken(payload) {
  return get('VALIDATE_TOKEN', {
    params: payload
  }, {
    extractData: false // for legacy api, use this prop to skip data extraction
  })
}

export function resetPassword(payload) {
  return post('RESET_PASSWORD', payload, {
    extractData: false // for legacy api, use this prop to skip data extraction
  })
}
