import request from '../../../utils/request'

/**
 *  删除减免信息
 * @param reductionId
 */
export async function deleteReduction(reductionId) {
  return request(`/charge/personnel-reduction/deletes/del-by-id`, "DELETE", {reductionIds: reductionId})
}


/**
 *   减免信息
 * @param personnelId
 */
export async function getReductionsByPersonnelId(personnelId) {
  return request(`/charge/personnel-reduction/gets/gets-by-personnel-id`, "GET", {personnelId})
}


/**
 *   更新数据
 * @param values
 */
export async function updateChargePersonnel(values) {
  return request(`/charge/charge-personnel/updates/update-by-id`, "PUT", {...values})
}


/**
 *   新增人员信息
 * @param projectId
 * @param values
 */
export async function createPersonnel(projectId, values) {
  return request(`/charge/charge-personnel/posts`, "POST", {...values, projectId})
}


/**
 *  增加减免信息
 * @param personnelIds
 * @param values
 */
export async function addReductions(personnelIds, values) {
  return request(`/charge/personnel-reduction/posts/post-by-personnel-ids?personnelIds=${personnelIds}`, "POST", {...values})
}


/**
 *   查询
 * @param projectId
 * @param searchValues
 * @param personnelPage
 * @param personnelPageSize
 */
export async function getChargePersonnels(projectId, searchValues, personnelPage, personnelPageSize) {
  return request(`/charge/charge-personnel/gets/page`, "GET", {
    ...searchValues,
    projectId,
    page: personnelPage,
    pageSize: personnelPageSize
  })
}

/**
 * 删除
 * @param personnelIds
 */
export async function deletePersonnels(personnelIds) {
  return request(`/charge/charge-personnel/deletes/del-by-id`, "DELETE", {personnelIds})
}


/**
 *  根据id查询数据
 * @param personnelId
 */
export async function getChargePersonnelById(personnelId) {
  return request(`/charge/charge-personnel/gets/get-by-id`, "GET", {personnelId})
}


