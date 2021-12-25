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
import {defineComponent} from "vue";

const NotFound = defineComponent({
    template: '<div>Not Found</div>',
})

const routes = [
    {path: '/', redirect: '/main'},
    {path: '/main', name: 'main', component: Main, alias: '/home'},
    {path: '/area', name: 'areaList', component: AreaList},
    {path: '/area/:name', name: 'areaDetail', component: AreaDetail},
    {path: '/member/login', name: 'memberLogin', component: MemberLogin},
    {path: '/member/join', name: 'memberJoin', component: MemberJoin},
    {path: '/member/mypage', name: 'memberMypage', component: MemberMypage},
    {path: '/review:areaNo?', name: 'reviewList', component: ReviewList},
    {path: '/review/:reviewNo', name: 'reviewDetail', component: ReviewDetail, props:true},
    {path: '/review/insert', name: 'reviewInsert', component: ReviewInsert},
    {path: '/review/update/:reviewNo', name: 'reviewUpdate', component: ReviewUpdate, props:true},
    {path: '/crew', name: 'crewList', component: CrewList},
    {path: '/crew/create', name: 'crewCreate', component: CrewCreate},
    {path: '/:catchAll(.*)+', component: NotFound},
]

export default routes
