import axios from "axios";
import { NotificationManager } from "react-notifications";

import { showLoader, hideLoader } from "../helpers/loader";

export let baseUrl = "https://slo-server.herokuapp.com/api/";
// export let baseUrl = process.env.REACT_APP_BASE_URL;

if (process.env.REACT_APP_NODE_ENV === "development") {
	baseUrl = 'http://127.0.0.1:8080/api/'
}

export const httpPost = async (url, postBody) => {
	try {
		const { data } = await axios.post(`${baseUrl}${url}`, postBody, {
			headers: { Authorization: localStorage.token },
		});
		return data;
	} catch (error) {
		hideLoader();
		// return error
		if(error.response.data.message === "Validation Error"){
			for (let i of error) {
				NotificationManager.error(
					i,
					"Oops!",
					3000
				);
				
			}
		}

		else{
			NotificationManager.error(
				error.response.data.message || "Something went wrong. Please retry.",
				"Oops!",
				3000
			);
		}
	
		return error;
	}
};

export const httpPatch = async (url, postBody) => {
	try {
		const { data } = await axios.patch(`${baseUrl}${url}`, postBody, {
			headers: { Authorization: localStorage.token },
		});
		return data;
	} catch (error) {
		hideLoader();
		// return error
		NotificationManager.error(
			error.response.data.message || "Something went wrong. Please retry.",
			"Oops!",
			3000
		);
		return error
	}
};

export const httpDelete = async (url, postBody) => {
	try {
		const { data } = await axios.delete(`${baseUrl}${url}`, {
			headers: { Authorization: localStorage.token },
		});
		return data;
	} catch (error) {
		hideLoader();
		// return error
		if(error.response.data.message === "Validation Error"){
			for (let i of error) {
				NotificationManager.error(
					i,
					"Oops!",
					3000
				);
				
			}
		} else {
			NotificationManager.error(
				error.response.data.message || "Something went wrong. Please retry.",
				"Oops!",
				3000
			);
		}
		return error
	}
};

export const httpGet = async (url) => {
	try {
		const { data } = await axios.get(`${baseUrl}${url}`, {
			headers: { Authorization: localStorage.token },
		});
		return data;
	} catch (error) {
		hideLoader();
		return error;
		// NotificationManager.error(
		// 	error.response.data.message || "Something went wrong. Please retry.",
		// 	"Oops!",
		// 	3000
		// );
	}
};

export const httpPostFormData = async (url, postBody) => {
	try {
		const { data } = await axios.post(`${baseUrl}${url}`, postBody, {
			headers: {
				Authorization: localStorage.token,
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	} catch (error) {
		hideLoader();
		// return error
		NotificationManager.error(
			error.response.data.message || "Something went wrong. Please retry.",
			"Oops!",
			3000
		);
		return error
	}
};
