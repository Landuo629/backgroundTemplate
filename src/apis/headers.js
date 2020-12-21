const token = sessionStorage.getItem('token');
console.log(token)
const headers = {
    // 'Authorization': token,
    // 'Token': token,
    'Content-Type': 'application/json',
}
export default headers;