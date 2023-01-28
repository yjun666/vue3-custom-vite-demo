import { http, http2, http3 } from '@/service';
export const getCheckListOneUrl = '/apitddsdepot/check/getCheckListOne';

// 测试 nginx 的代理
export function getCheckListOne(data) {
    return http2.request({
        url: getCheckListOneUrl,
        method: 'post',
        data
    })
}
