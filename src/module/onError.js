import {useRouter} from "vue-router";
import login from "./login";
const router = useRouter()

export default {
    httpErrorException: (error) => {
        const httpErrorCode = error.response.status
        const errorMsg = error.response.data

        if (httpErrorCode === 401) {
            alert("로그인이 필요 합니다.")
            router.replace('/member/login').then(() => {
                login.removeUserInfo()
            })
        }else if(httpErrorCode === 403){
            alert(errorMsg)
        }else{
            router.replace('/error').then(() => {
                login.removeUserInfo()
            })
        }
    }
}