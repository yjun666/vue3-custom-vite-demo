const getters = {
    token: (state: any) => {
        console.log(state);
        return state.UserOptions.token
    },
    avatar: (state: any) => state.UserOptions.avatar,
    name: (state: any) => state.UserOptions.name,
    introduction: (state: any) => state.UserOptions.introduction,
    roles: (state: any) => state.UserOptions.roles,
    permission_routes: (state: any) => state.PermissionOptions.routes,
    loadingCount: (state: any) => state.LoadingOptions.loadingCount,
}
export default getters
