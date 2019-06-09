import request from '../../utils/request'

/**
 *   查询项目列表
 * @param values 搜索条件
 * @param page 当前页
 * @param pageSize 没有显示的数量
 * @returns {Promise<*>}
 */
export function queryProject(values, page, pageSize) {
    return request('/charge/charge-project/gets/page', "GET", {...values, page, pageSize})
}