import request from '../../../utils/request'


/**
 *  删除减免信息
 * @param reductionId
 */
export function deleteReduction(reductionId) {

}


/**
 *   减免信息
 * @param personnelId
 */
export function getReductionsByPersonnelId(personnelId) {

}


/**
 *   更新数据
 * @param values
 */
export function updateChargePersonnel(values) {
  return request(`/charge/charge-personnel/updates/update-by-id`, "PUT", {...values})
}


/**
 *   新增人员信息
 * @param projectId
 * @param values
 */
export function createPersonnel(projectId, values) {
  return request(`/charge/charge-personnel/posts`, "POST", {...values, projectId})
}


/**
 *  增加减免信息
 * @param personnelIds
 * @param values
 */
export function addReductions(personnelIds, values) {
  return request(`/charge/personnel-reduction/posts/post-by-personnel-ids?personnelIds=${personnelIds}`, "POST", {...values})
}


/**
 *   查询
 * @param projectId
 * @param searchValues
 * @param personnelPage
 * @param personnelPageSize
 */
export function getChargePersonnels(projectId, searchValues, personnelPage, personnelPageSize) {
  return {
    data: [],
    total: 0
  }
}

/**
 * 删除
 * @param personnelIds
 */
export function deletePersonnels(personnelIds) {

}


/**
 *  根据id查询数据
 * @param personnelId
 */
export function getChargePersonnelById(personnelId) {

}


