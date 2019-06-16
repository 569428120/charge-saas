import moment from "moment";
import request from '../../utils/request'


/**
 *  查询项目详情
 * @param projectId 项目id
 * @param name 名称
 */
export function queryDetails(projectId, name) {
    return request('/charge/charge-details/gets/all', "GET", {projectId, name})
}

/**
 *  查询
 * @param chargeDetailsId
 */
export function getDetailsById(chargeDetailsId) {
    return request('/charge/charge-details/gets/get-by-id', "GET", {detailId: chargeDetailsId})
}

/**
 *  删除收费项
 * @param detailIds
 */
export function deleteChargeDetails(detailIds) {
    return request('/charge/charge-details/deletes/del-by-id', "DELETE", {detailIds})
}

/**
 *   新增收费项
 * @param values
 */
export function createChargeDetails(values) {
    if (values.boardingCodes) {
        values = {
            ...values,
            boardingCodes: values.boardingCodes.join(",")
        }
    }
    return request('/charge/charge-details/posts', "POST", {...values})
}

/**
 * 更新收费项
 * @param values
 */
export function updateChargeDetails(values) {
    if (values.boardingCodes) {
        values = {
            ...values,
            boardingCodes: values.boardingCodes.join(",")
        }
    }
    return request('/charge/charge-details/updates/update-by-id', "PUT", {...values})
}

/**
 *  寄读方式
 */
export function getSysBoardingData() {
    return request('/charge/system-boarding/gets/all', "GET", {})
}

/**
 *  交通路线
 */
export function getSysRouteData() {
    return request('/charge/system-route/gets/all', "GET", {})
}
