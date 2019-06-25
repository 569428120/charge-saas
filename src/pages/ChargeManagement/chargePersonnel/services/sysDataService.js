import request from '../../../utils/request'

/**
 *  交通路线，班级，寄读方式 三合一接口
 */
export async function getSysRouteAndBoardingAndClassData() {
    return request('/charge/system-common/gets/all', "GET", {})
}
