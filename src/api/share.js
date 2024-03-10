import request from '@/utils/request'

//获取互相关联的列表
export const shareGetListService = (userId) => {
  return request.get(`/share/list?user_id=${userId}`)
}

//删除好友
export const shareDeleteByIdService = (userId, friendId) => {
  return request.delete(`/share?user_id=${userId}&friend_id=${friendId}`)
}

//根据手机号搜索用户
export const shareSearchUserService = (phone) => {
  return request.get(`/share/search?phone=${phone}`)
}

//发送好友申请
export const shareAddFriendService = (userId, friendId) => {
  return request.post('/share/add', {
    userId,
    friendId
  })
}

//获取好友申请列表
export const shareGetWaitListService = (userId) => {
  return request.get(`/share/wait-list/${userId}`)
}

//用户回复好友申请
export const shareUpdateShareRequestService = (userId, friendId, status) => {
  return request.put('/share/add', {
    userId,
    friendId,
    status
  })
}
