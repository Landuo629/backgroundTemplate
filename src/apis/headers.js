const token = sessionStorage.getItem('token');
const headers = {
    // 'Authorization': token,
    // 'Token': token,
    'Content-Type': 'application/json',
}
export default headers;