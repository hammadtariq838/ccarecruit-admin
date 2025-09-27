import ServerGetRequestAction from '@/actions/serverGetRequestAction'

export const fetchUserDetailsOnServer = async () => {
  return await ServerGetRequestAction('/user/me')
}
