/**
 *
 * @param roleInfoId
 * @param checked
 */
export function enableRoleInfoById(roleInfoId, checked) {

}

/**
 *
 * @param name
 */
export function validatorName(name) {
  if (name === "name") {
    return {data: true}
  }
  return {data: false}
}

/**
 *
 * @param values
 */
export function updateRoleInfo(values) {

}

/**
 *  创建角色
 * @param values
 */
export function createRoleInfo(values) {

}

/**
 *
 */
export function deleteRoleInfoByIds(roleIds) {

}

/**
 *
 * @param roleId
 */
export function getRoleInfoById(roleId) {

}

/**
 *
 * @param searchValues
 * @param page
 * @param pageSize
 */
export function getRoleInfos(searchValues, page, pageSize) {
  return {
    data: [
      {
        id: 1,
        name: "管理员",
        enable: true,
        description: "ces"
      },
      {
        id: 2,
        name: "管理员1",
        enable: false,
        description: "ces"
      }
    ],
    total: 2
  }
}
