import {axios} from "@bundled-es-modules/axios";
import {ref} from "vue"
import {router} from "../router/router";
import {useCookies} from "vue3-cookies";

const loginMsg = ref('')
const refreshKey = ref(0)
const memberData = ref('')
const {cookies} = useCookies()

export default {
    loginMsg: loginMsg,
    refreshKey: refreshKey,
    memberData: memberData,
    doLogin: async (id, password, URL_MEMBER_LOGIN) => {
        await axios({
            method: 'post',
            url: URL_MEMBER_LOGIN,
            data: {
                id: id,
                password: password
            }
        }).then((resp) => {
            console.log(URL_MEMBER_LOGIN + " 요청 성공 status : " + resp.status)
            console.log('로그인 성공')

            localStorage.setItem('loginState', 'login')
            localStorage.setItem('id', resp.data.id)
            localStorage.setItem('name', resp.data.name)
            localStorage.setItem('nickname', resp.data.nickname)
            localStorage.setItem('memberImg', resp.data.memberImg)
            localStorage.setItem('birth', resp.data.birth)
            localStorage.setItem('gender', resp.data.gender)
            localStorage.setItem('email', resp.data.email)
            localStorage.setItem('phone', resp.data.phone)
            localStorage.setItem('isCrewLeader', resp.data.isCrewLeader)

            refreshKey.value++
            router.replace('/main')
            memberData.value = resp.data

            return true
        }).catch(() => {
            console.log(URL_MEMBER_LOGIN + " 요청 실패")
            loginMsg.value = "로그인에 실패 하였습니다. 아이디 또는 비밀번호를 확인해 주세요. "
            localStorage.setItem('loginState', 'fail')
            refreshKey.value++
            return false
        })
    },
    doLogout: (component) => {
        localStorage.setItem('loginState', 'logout')
        localStorage.removeItem('id')
        localStorage.removeItem('nickname')
        localStorage.removeItem('memberImg')
        localStorage.removeItem('birth')
        localStorage.removeItem('gender')
        localStorage.removeItem('email')
        localStorage.removeItem('phone')
        localStorage.removeItem('isCrewLeader')
        router.replace('/main').then(() => {
            alert("로그아웃 되었습니다.")
        })
        cookies.remove('token')
        component.$forceUpdate()
        refreshKey.value++
    }
}