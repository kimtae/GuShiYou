import method from './method'
import config from './config'

export const getOperationLogs = (pageSize, pageNumber, operatorId) => {
  return new Promise((resolve, reject) => {
    let url
    if (operatorId) {
      url = config.getOperationLogsUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&operatorId=' + operatorId
    } else {
      url = config.getOperationLogsUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber
    }
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}
