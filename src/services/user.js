import axios from 'axios';

exports.fetchUserMsg = (userName) => {
  return axios.get(`https://api.github.com/users/${userName}`)
}