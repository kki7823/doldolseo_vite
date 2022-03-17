import {axios} from "@bundled-es-modules/axios";
import {router} from "../router/router.js";
import {ref} from "vue"
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
        try {
            const resp = await axios({
                method: 'post',
                url: URL_MEMBER_LOGIN,
                data: {
                    id: id,
                    password: password
                },
                withCredentials: true
            })

            localStorage.setItem('loginState', 'login')
            localStorage.setItem('id', resp.data.id)
            localStorage.setItem('name', resp.data.name)
            localStorage.setItem('nickname', resp.data.nickname)
            localStorage.setItem('memberImg', resp.data.memberImg)
            localStorage.setItem('birth', resp.data.birth)
            localStorage.setItem('gender', resp.data.gender)
            localStorage.setItem('email', resp.data.email)
            localStorage.setItem('phone', resp.data.phone)
            localStorage.setItem('memberRole', resp.data.memberRole)
            refreshKey.value++

            await router.replace('/main').then(() => {
            })
            memberData.value = resp.data
        } catch
            (err) {
            console.log(URL_MEMBER_LOGIN + " 요청 실패: " + err)
            loginMsg.value = "로그인에 실패 하였습니다. 아이디 또는 비밀번호를 확인해 주세요. "
            localStorage.setItem('loginState', 'fail')
            refreshKey.value++
        }
    },
    doLogin2: (id, password, URL_MEMBER_LOGIN) => {
        try {
            const resp = axios({
                method: 'post',
                url: URL_MEMBER_LOGIN,
                data: {
                    id: id,
                    password: password
                },
            })
            localStorage.setItem('loginState', 'login')
            localStorage.setItem('id', resp.data.id)
            localStorage.setItem('name', resp.data.name)
            localStorage.setItem('nickname', resp.data.nickname)
            localStorage.setItem('memberImg', resp.data.memberImg)
            localStorage.setItem('birth', resp.data.birth)
            localStorage.setItem('gender', resp.data.gender)
            localStorage.setItem('email', resp.data.email)
            localStorage.setItem('phone', resp.data.phone)
            localStorage.setItem('memberRole', resp.data.memberRole)
            refreshKey.value++

            router.replace('/main').then(() => {
            })
            memberData.value = resp.data
        } catch
            (err) {
            console.log(URL_MEMBER_LOGIN + " 요청 실패: " + err)
            loginMsg.value = "로그인에 실패 하였습니다. 아이디 또는 비밀번호를 확인해 주세요. "

            localStorage.setItem('loginState', 'fail')
            refreshKey.value++
        }
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
        localStorage.removeItem('memberRole')
        router.replace('/main').then(() => {
            alert("로그아웃 되었습니다.")
        })
        cookies.remove('token')
        component.$forceUpdate()
        refreshKey.value++
    },

    removeUserInfo: () => {
        localStorage.setItem('loginState', 'logout')
        localStorage.removeItem('id')
        localStorage.removeItem('nickname')
        localStorage.removeItem('memberImg')
        localStorage.removeItem('birth')
        localStorage.removeItem('gender')
        localStorage.removeItem('email')
        localStorage.removeItem('phone')
        localStorage.removeItem('memberRole')
        cookies.remove('token')
        refreshKey.value++
    },

}