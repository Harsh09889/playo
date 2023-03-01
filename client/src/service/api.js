import axios from "axios";
import { BASE_URL, SERVICE_URLS } from "../constants/config.js";

const API_URL = "http://localhost:8080/api";
const API = {};

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	timeout: 10000,
});

for (const [key, value] of Object.entries(SERVICE_URLS)) {
	API[key] = async (body, showUploadProgress, showDownloadProgress) => {
		return await axiosInstance({
			method: value.method,
			url: value.url,
			data: body,
			responseType: value?.responseType,

			onUploadProgress: function (progressEvent) {
				if (showUploadProgress) {
					let percentageCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					showUploadProgress(percentageCompleted);
				}
			},

			onDownloadProgress: function (progressEvent) {
				if (showDownloadProgress) {
					let percentageCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					showDownloadProgress(percentageCompleted);
				}
			},
		});
	};
}

///////////////////////////////////////////////////////
//if success -> return { isSuccess:true, data:Object }
//if failure -> return { isFailure:true, status:String, msg:string, code:int }
//////////////////////////////////////////////////////

export { API };
