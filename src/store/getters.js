const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  loadingCount: state => state.loading.loadingCount,
  previewImgUrl: state => state.preview.previewImgUrl,
}
export default getters
