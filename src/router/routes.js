import Main from "../components/main/DoldolseoMain.vue";
import AreaList from "../components/area/DoldolseoAreaList.vue";
import AreaDetail from "../components/area/DoldolseoAreaDetail.vue";
import MemberLogin from "../components/member/DoldolseoMemberLogin.vue";
import MemberJoin from "../components/member/DoldolseoMemberJoin.vue";
import MemberMypage from "../components/member/DoldolseoMemberMypage.vue";
import ReviewList from "../components/review/DoldolseoReviewList.vue";
import ReviewDetail from "../components/review/DoldolseoReviewDetail.vue";
import ReviewInsert from "../components/review/DoldolseoReviewInsert.vue";
import ReviewUpdate from "../components/review/DoldolseoReviewUpdate.vue";
import CrewCreate from "../components/crew/DoldolseoCrewCreate.vue";
import CrewList from "../components/crew/DoldolseoCrewList.vue";
import CrewDetail from "../components/crew/DoldolseoCrewDetail.vue";
import CrewManage from "../components/crew/DoldolseoCrewManage.vue";
import CrewPostList from "../components/crewpost/DoldolseoCrewPostList.vue";
import CrewPostInsert from "../components/crewpost/DoldolseoCrewPostInsert.vue";
import CrewPostDetail from "../components/crewpost/DoldolseoCrewPostDetail.vue";
import CrewPostUpdate from "../components/crewpost/DoldolseoCrewPostUpdate.vue";
import PageNotFound from "../components/exception/DoldolseoNotFound.vue";
import Error from "../components/exception/DoldolseoError.vue";
import {defineComponent} from "vue";
import {useCookies} from "vue3-cookies";
import {router} from "./router";

const NotFound = defineComponent({
    template: '<div>Not Found</div>',
})

const {cookies} = useCookies()

const isLogined = (to, from, next) => {
    if (localStorage.loginState === "login" && cookies.get('token') !== "") {
        return next();
    }
    router.replace('/member/login').then(() => {
    })
}

const isCrewLeader = (to, from, next) => {
    if (localStorage.getItem('memberRole') === 'CREWLEADER' && cookies.get('token') !== "") {
        return next();
    }
    alert("잘못된 접근 입니다.")
    router.replace('/member/login').then(() => {
    })
}

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        alias: '/home'
    },
    {
        path: '/area',
        name: 'areaList',
        component: AreaList
    },
    {
        path: '/area/:name',
        name: 'areaDetail',
        component: AreaDetail
    },
    {
        path: '/member/login',
        name: 'memberLogin',
        component: MemberLogin
    },
    {
        path: '/member/join',
        name: 'memberJoin',
        component: MemberJoin
    },
    {
        path: '/member/mypage',
        name: 'memberMypage',
        component: MemberMypage
    },
    {
        path: '/review:areaNo?',
        name: 'reviewList',
        component: ReviewList
    },
    {
        path: '/review/:reviewNo',
        name: 'reviewDetail',
        component: ReviewDetail,
        props: true
    },
    {
        path: '/review/insert',
        name: 'reviewInsert',
        component: ReviewInsert,
        beforeEnter: isLogined
    },
    {
        path: '/review/update/:reviewNo',
        name: 'reviewUpdate',
        component: ReviewUpdate,
        props: true,
        beforeEnter: isLogined
    },
    {
        path: '/crew',
        name: 'crewList',
        component: CrewList,
        props: true
    },
    {
        path: '/crew/create',
        name: 'crewCreate',
        component: CrewCreate,
        beforeEnter: isLogined
    },
    {
        path: '/crew/:crewNo',
        name: 'crewDetail',
        component: CrewDetail,
        props: true
    },
    {
        path: '/crew/manage',
        name: 'crewManage',
        component: CrewManage,
        beforeEnter: isCrewLeader
    },
    {
        path: '/crew/post',
        name: 'crewPostList',
        component: CrewPostList,
    },
    {
        path: '/crew/post/insert',
        name: 'crewPostInsert',
        component: CrewPostInsert,
        beforeEnter: isLogined
    },
    {
        path: '/crew/post/:crewPostNo',
        name: 'crewPostDetail',
        component: CrewPostDetail,
        props: true
    },
    {
        path: '/crew/post/update/:crewPostNo',
        name: 'crewPostUpdate',
        component: CrewPostUpdate,
        props: true,
        beforeEnter: isLogined
    },
    {
        path: '/error:errorCode',
        name: 'Error',
        component: Error,
        props: true
    },
    {
        path: '/:catchAll(.*)+',
        redirect: '/404'
    },
    {
        path: '/404',
        name: 'pageNotFound',
        component: PageNotFound,
    },

]

export default routes
