import moment from "moment";
import request from '../../utils/request'


/**
 *   查询项目列表
 * @param values 搜索条件
 * @param page 当前页
 * @param pageSize 没有显示的数量
 * @returns {Promise<*>}
 */
export function queryProject(values, page, pageSize) {
    const name = values.name;
    let startTime = "";
    let endTime = "";
    if (values.startTime) {
        startTime = moment(values.startTime).format('YYYY-MM-DD');
    }
    if (values.endTime) {
        endTime = moment(values.endTime).format('YYYY-MM-DD')
    }
    const params = {
        name,
        startTime,
        endTime
    };

    return request('/charge/charge-project/gets/page', "GET", {...params, page, pageSize})
}

/**
 *   新建收费项目
 * @param values 表单数据
 */
export function createProject(values) {
    const {name, description} = values;
    let startTime = "";
    let endTime = "";
    if (values.startTime) {
        startTime = moment(values.startTime).format('YYYY-MM-DD');
    }
    if (values.endTime) {
        endTime = moment(values.endTime).format('YYYY-MM-DD')
    }

    const params = {
        name,
        startTime,
        endTime,
        description
    };
    return request('/charge/charge-project/posts', "POST", {...params})
}