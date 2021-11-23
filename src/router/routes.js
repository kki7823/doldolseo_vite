import Main from "../components/main/DoldolseoMain.vue";
import AreaList from "../components/area/DoldolseoAreaList.vue";
import AreaDetail from "../components/area/DoldolseoAreaDetail.vue";
import ReviewList from "../components/review/DoldolseoReviewList.vue";

import {defineComponent} from "vue";

const NotFound = defineComponent({
    template: '<div>Not Found</div>',
})

const routes = [
    {path: '/', redirect: '/main'},
    {path: '/main', name: 'main', component: Main, alias: '/home'},
    {path: '/review', name: 'review', component: ReviewList},
    {path: '/area', name: 'areaList', component: AreaList},
    {path: '/area/:name', name: 'areaDetail', component: AreaDetail},
    {path: '/:catchAll(.*)+', component: NotFound},
]

export default routes
