import axios from "axios";
import { Field } from "./GolfTurfScouting";

const baseAPI = "/api/Test";

// Запросы для модуля состояния газона
export const GTSAPIs = {
  // Получение списка полей пользователя
  getFields(userID: number) {
    return axios.get<Field[]>(`${baseAPI}/FieldNameForUser/${userID}`);
  },

  // Добавление поля
  postField(body: Object) {
    return axios.post(`${baseAPI}/addField`, body);
  },

  putField(fieldID: number, body: Object) {
    return axios.put(`${baseAPI}/updateField/${fieldID}`, body);
  },

  deleteField(fieldID: number) {
    return axios.delete(`${baseAPI}/deleteField/${fieldID}`);
  },

  // Получение данных NDVI карты
  getNDVI(fieldID: string, date: string) {
    return axios.get(`${baseAPI}/getNdviMap/${fieldID}?date=${date}`);
  },
};
