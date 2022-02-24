import {ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useCookies} from "vue3-cookies";
import {router} from "../router/router";
import login from "./login";

const start_x = 225
const start_y = 100

const x = ref(start_x)
const y = ref(start_y)
const canvas = ref({})

let btnCount = 1
let toggle = true

const drawDefaultNode = () => {
    const ctx = canvas.value.getContext('2d');
    const radius = 15;

    //원(Outer) 반지름 :15 / 둘레 : 2pi
    ctx.beginPath();
    ctx.arc(x.value, y.value, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#29088A";
    ctx.fill();

    //원(Inner)
    ctx.beginPath();
    ctx.arc(x.value, y.value, 10, 0, Math.PI * 2);

    //기본 노드 색상
    ctx.fillStyle = "#BDBDBD";
    ctx.fill();

    //텍스트 추가
    addText(x.value, y.value, '출발');

    //toggle값에 따라 방향 반전 (drawCurve 호출시 toggle)
    if (toggle) {
        x.value += radius;
    } else {
        x.value -= radius;
    }
}

const addText = (x, y, text) => {
    const ctx = canvas.value.getContext('2d');
    ctx.font = '25px Sans-Serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = "#4C4C4C";

    ctx.fillText(text, x, y + 25, 150);
}

const drawNodeAndLine = (placeName, placeType) => {
    if (btnCount === 16) {
        alert("여행지를 15개이상 추가하실수 없습니다.");
        return;
    }
    //노드 4개 생성한 후 커브
    if (btnCount % 4 === 0) {
        if (toggle) drawCurve_R() // 우측 곡선 그린 후 좌표 이동
        else drawCurve_L() //좌측 곡선 그린 후 좌표 이동

        toggle = !toggle //커브할 때 마다 토글

        drawNode(placeName, placeType) //노드 그린 후 좌표 이동
        btnCount++
    } else {
        drawLine() //직선 그린 후 좌표 이동
        drawNode(placeName, placeType) //노드 그린 후 좌표 이동
        btnCount++;
    }
}

const drawLine = () => {
    const ctx = canvas.value.getContext('2d');
    const lineLengtn = 180;

    ctx.lineWidth = 4; //선굵기
    ctx.strokeStyle = "#29088A";
    ctx.beginPath();
    ctx.moveTo(x.value, y.value);

    //toggle값에 따라 방향 반전 (drawCurve 호출시 toggle)
    if (toggle) {
        ctx.lineTo(x.value + lineLengtn, y.value);
        x.value += lineLengtn;
    } else {
        ctx.lineTo(x.value - lineLengtn, y.value);
        x.value -= lineLengtn;
    }

    ctx.closePath();
    ctx.stroke();
}

const drawNode = (placeName, placeType) => {
    const ctx = canvas.value.getContext('2d');
    const radius = 15;

    //원(Outer) 반지름 :15 / 둘레 : 2pi
    ctx.beginPath();
    ctx.arc(x.value, y.value, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#29088A";
    ctx.fill();

    //원(Inner)
    ctx.beginPath();
    ctx.arc(x.value, y.value, 10, 0, Math.PI * 2);

    //타입에 따라 노드 색상 변경
    if (placeType === 1) ctx.fillStyle = "#58ACFA";
    else if (placeType === 2) ctx.fillStyle = "#F5A9E1";
    else if (placeType === 3) ctx.fillStyle = "#CEF6D8";
    ctx.fill();

    //텍스트 추가
    addText(x.value, y.value, placeName);

    //toggle값에 따라 방향 반전 (drawCurve 호출시 toggle)
    if (toggle) x.value += radius;
    else x.value -= radius;
}

const drawCurve_R = () => {
    const ctx = canvas.value.getContext('2d');
    const lineLengtn = 50;
    const curveRadius = 60;

    ctx.lineWidth = 4; //선 굵기
    ctx.strokeStyle = "#29088A"; //선 색깔

    //직선(상)
    ctx.beginPath();
    ctx.moveTo(x.value, y.value);
    ctx.lineTo(x.value + lineLengtn, y.value);
    ctx.closePath();
    ctx.stroke();
    x.value += lineLengtn;

    //곡선 (반원)
    ctx.beginPath();
    ctx.arc(x.value, y.value + curveRadius, curveRadius, Math.PI * 3 / 2, Math.PI / 2, false);
    ctx.stroke();
    y.value += curveRadius * 2  //y값 이동

    //직선(하)
    ctx.beginPath();
    ctx.moveTo(x.value, y.value);
    ctx.lineTo(x.value - lineLengtn, y.value);
    ctx.closePath();
    ctx.stroke();
    x.value -= lineLengtn;
}

const drawCurve_L = () => {
    const ctx = canvas.value.getContext('2d');
    const lineLengtn = 50;
    const curveRadius = 60;

    ctx.lineWidth = 4; //선 굵기
    ctx.strokeStyle = "#29088A"; //선 색깔

    //직선(상)
    ctx.beginPath();
    ctx.moveTo(x.value, y.value);
    ctx.lineTo(x.value - lineLengtn, y.value);
    ctx.closePath();
    ctx.stroke();
    x.value -= lineLengtn;

    //곡선 (반원)
    ctx.beginPath();
    ctx.arc(x.value, y.value + curveRadius, curveRadius, Math.PI * 3 / 2, Math.PI / 2, true);
    ctx.stroke();
    y.value += curveRadius * 2  //y값 이동

    //직선(하)
    ctx.beginPath();
    ctx.moveTo(x.value, y.value);
    ctx.lineTo(x.value + lineLengtn, y.value);
    ctx.closePath();
    ctx.stroke();
    x.value += lineLengtn;
}

const clearNode = () => {
    const ctx = canvas.value.getContext('2d');
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    //전역변수 초기화
    btnCount = 1;
    toggle = true;
    x.value = start_x
    y.value = start_y
    //출발 노드 생성
    drawDefaultNode()
}

const addTitle = (title) => {
    const ctx = canvas.value.getContext('2d');
    ctx.fillStyle = 'green';

    //드로잉 전 초기화
    ctx.clearRect(0, 5, canvas.value.width, 60);

    ctx.font = '35px Jua';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = "#0080FF";

    ctx.fillText(title, 500, 30, 500);
}

const uploadCourse = (URL) => {
    const formData = new FormData()

    if (canvas.value != null) {
        const imageBase64 = canvas.value.toDataURL('image/png');

        //base64 to blob
        const decodedImg = atob(imageBase64.split(',')[1]);
        const array = [];
        for (let i = 0; i < decodedImg.length; i++) {
            array.push(decodedImg.charCodeAt(i));
        }
        const file = new Blob([new Uint8Array(array)], {type: 'image/png'});
        formData.append("courseImgFile", file, "course.png");
    }

    const {cookies} = useCookies()
    axios.post(URL, formData, {
        headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
        }
    }).then((resp) => {
        console.log(URL + " 코스 저장 성공 status : " + resp.status)
        console.log(URL + '/' + resp.data)
        alert("코스를 저장하였습니다.")
    }).catch((err) => {
        console.log(URL + " 코스 저장 실패 ")
        if (err.response.status === 401) {
            alert("로그인이 필요 합니다.")
            router.replace('/member/login').then(() => {
                login.removeUserInfo()
            })
        }
    })
}

export default {
    start_x: start_x,
    start_y: start_y,
    canvas: canvas,

    drawDefaultNode: drawDefaultNode,
    drawNodeAndLine: drawNodeAndLine,
    clearNode: clearNode,
    addTitle: addTitle,
    uploadCourse: uploadCourse,
}

