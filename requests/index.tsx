import axios from 'axios'

export const doGet = async (endpoint: string, headers: object = {}) => {
  const response = await axios.get(endpoint, {
    headers: {
      ...headers
    }
  })

  return response.data.data
}

export const doPost = async (
  endpoint: string,
  data: object,
  headers: object = {}
) => {
  const response = await axios.post(endpoint, data, {
    headers: {
      ...headers
    }
  })

  return response.data.data
}

export const doPatch = async (
  endpoint: string,
  data: object,
  headers: object = {}
) => {
  const response = await axios.patch(endpoint, data, {
    headers: {
      ...headers
    }
  })

  return response.data.data
}

export const doPut = async (
  endpoint: string,
  data: object,
  headers: object = {}
) => {
  const response = await axios.put(endpoint, data, {
    headers: {
      ...headers
    }
  })

  return response.data.data
}

export const doDelete = async (endpoint: string, headers: object = {}) => {
  const response = await axios.delete(endpoint, {
    headers: {
      ...headers
    }
  })

  return response.data.data
}
