import {axios} from "@bundled-es-modules/axios";

export default function () {
    const BASE_URL = 'http://localhost:58546'
    const axiosGET = (URL, onSuccess = null, onFailed = null, result) => {
        const final_URL = URL.startsWith('http') ? URL : BASE_URL + URL
        axios.get(final_URL).then((resp) => {
            if (resp.status === 200 && resp.statusText === 'OK') {
                if (onSuccess) {
                    onSuccess(resp.data)
                }
            } else {
                if (onFailed) {
                    onFailed(resp.data)
                }
            }
        })
    }

    return {
        axiosGET,
    }
}