import axios from "axios";

const baseAPI = "http://localhost:8000";

// Запросы для модуля состояния газона
export const NDVIAPIs = {
  // Получение списка полей пользователя
  postContrastNDVI(body) {
    return axios.post(`${baseAPI}/AddContrastNdvi`, body);
  },

  // Добавление поля
  postContrastNDVIUpsampling(body) {
    return axios.post(`${baseAPI}/AddContrastNdviUpsampling`, body, {responseType: 'arraybuffer'});
  },

  postColorNDVI(body) {
    return axios.post(`http://localhost:8000/AddColorNdvi`, body);
  },

  postColorNDVIUpsampling(body) {
    return axios.post(`${baseAPI}/AddColorNdviUpsampling`, body);
  },

};
