import { stringify } from 'qs';
import request from '../utils/request';
import requestNew from '../utils/requestnomral';
export async function getUserToken() {
  return sessionStorage.getItem('accessToken');
}
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}
//
// export async function queryRule(params) {
//   return request(`/api/rule?${stringify(params)}`);
// }

export async function queryRule(params) {
  return requestNew('/api/company/technicianList?page=1&accessToken=222222');
}
export async function queryRulePro(params) {
  return requestNew('/api/message/messageList?pageSize=undefined&page=1&accessToken=222222');
}
export async function queryRuleUser(params) {
  return requestNew('/api/uccenter/userList?page=1&accessToken=222222');
}
export async function queryRuleClassify(params) {
  return requestNew('/api/category/list?page=1&accessToken=222222');
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}
//登录接口
export async function fakeAccountLogin(params) {
  return requestNew('/api/uccenter/login', {
    method: 'POST',
    body:JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    }
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
