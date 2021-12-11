/*
작성자 : 백정연
작성일 : 210720
사용 페이지 :   memberLogin.jsp
함수 설명 : 로그인시 유효성 체크 및 ID 기억하기 함수
 */
function loginCheck() {
    if (document.getElementById('login_id').value.length == 0) {
        alert("아이디를 입력해주세요.");
        document.getElementById('login_id').focus();
        return false;
    }

    if (document.getElementById('login_pw').value.length == 0) {
        alert("비밀번호를 입력해주세요.");
        document.getElementById('login_pw').focus();
        return false;
    }

    function setCookie(name, value, expiredays) //쿠키 저장함수
    {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires="
            + todayDate.toGMTString() + ";"
    }

    if (document.getElementById('remember_id').checked == true) {
        setCookie("id", document.getElementById('login_id').value, 7);
    } else {
        setCookie("id", document.getElementById('login_id').value, 0);
    }
    return true;
}

/*
작성자 : 백정연
작성일 : 210721
사용 페이지 :   memberJoin.jsp, mypageDetail.jsp
함수 설명 : 프로필 사진 업로드시 회원가입 화면에 보여주는 함수
 */

function setImg(event) {
    var reader = new FileReader();

    reader.onload = function (event) {
        document.getElementById('my_img').setAttribute("src", event.target.result);
        /*
        * document.getElementById('my_img').src = event.target.result;
        */
    }
    reader.readAsDataURL(event.target.files[0]);
}

/*
작성자 : 백정연
작성일 : 210721
사용 페이지 :   memberJoin.jsp
함수 설명 : 비밀번호 유효성 검사 함수
 */

function pwCheck() {
    var pw = document.joinFrm.password.value;
    var num = /[0-9]/;
    var eng = /[a-zA-Z]/;
    var spe = /[~!@\#$%<>^&*]/;

    if (num.test(pw) && eng.test(pw) && spe.test(pw) && pw.length > 7 && pw.length <= 20) {
        document.joinFrm.check_pw.value = "y";
        document.joinFrm.password.style.backgroundImage = "url('_image/member/lock/lock_blue.png')";
        document.getElementById('validate_pw').innerText = "";
    } else {
        document.joinFrm.check_pw.value = "";
        document.joinFrm.password.style.backgroundImage = "url('_image/member/lock/lock_red.png')"
        document.getElementById('validate_pw').innerText = "8~20자 영문, 숫자, 특수문자를 사용하세요.";
    }
}

/*
작성자 : 백정연
작성일 : 210721
사용 페이지 :   memberJoin.jsp
함수 설명 : 비밀번호 재입력 일치하는지 확인하는 함수
 */

function pw2Check() {
    var pw = document.joinFrm.password.value;
    var re_pw = document.joinFrm.password2.value;
    if (pw == re_pw) {
        document.joinFrm.check_pw2.value = "y";
        document.joinFrm.password2.style.backgroundImage = "url('_image/member/lock/lock_blue.png')";
        document.getElementById('validate_pw2').innerText = "";
    } else {
        document.joinFrm.check_pw2.value = "";
        document.joinFrm.password2.style.backgroundImage = "url('_image/member/lock/lock_red.png')"
        document.getElementById('validate_pw2').innerText = "비밀번호가 일치하지 않습니다. ";
    }
}

/*
작성자 : 백정연
작성일 : 210721
사용 페이지 :   memberJoin.jsp
함수 설명 : 회원가입시 모든 입력 정보 유효성 검사하는 함수
 */


/*
작성자 : 백정연
작성일 : 210722
사용 페이지 :   mypageDetail.jsp
함수 설명 : 회원 정보 수정 버튼 클릭시 입력값 유효성 검사 함수
 */


/*
작성자 : 백정연
작성일 : 210725
사용 페이지 :   planList.jsp
함수 설명 : 플래너 작성 버튼 클릭시 popup_planInsert.jsp 띄워주는 함수
 */

function showPopup() {
    window.open("http://localhost:8080/pop", "startpop", "top=0, left=0, width=800, height=500, scrollbars=no, resizable=no ,status=no ,toolbar=no");
    // opener.location.href="http://localhost:8080/pop";
}

/*
작성자 : 백정연
작성일 : 210725
사용 페이지 :   planList.jsp
함수 설명 : 팝업창에서 플래너 만들기 버튼 클릭시 입력한 내용을 controller에게 넘겨주는 함수
 */
function popupCheck() {
    var f_date = new Date(document.popupFrm.fDate.value);
    var l_date = new Date(document.popupFrm.lDate.value);

    if (l_date < f_date) {
        alert("도착 날짜가 출발 날짜보다 빠릅니다.");
        return false;
    } else {
        return true;
    }
}

/*
작성자 : 백정연
작성일 : 210726
사용 페이지 :   planDetail.jsp
함수 설명 : DAY 1 버튼 클릭시 해당하는 날짜의 지도 경로 보여주는 함수
 */
function mapChange() {
    var select = document.getElementById("select_day");
    var current = select.options[select.selectedIndex].value;
    var slide = document.querySelectorAll(".planD-map");
    var listslides = document.querySelectorAll(".planD-placelist");

    for (var k = 0; k < slide.length; k++) {
        slide[k].style.display = "none";
    }
    slide[current].style.display = "block";

    for (var j = 0; j < listslides.length; j++) {
        listslides[j].style.display = "none";
    }
    listslides[current].style.display = "block";
}

/*
작성자 : 백정연
작성일 : 210729
사용 페이지 :   planInsert.jsp
함수 설명 : DAY 버튼 클릭시 해당하는 날짜의 일정만 보여주는 함수
 */
var planslide = document.querySelectorAll(".planI-plansbox");

var plans_current = 1;

// 왜냐면 index로 적용해야 하는데 지금은 시험삼아 1번부터 시작하기에

function plansChange(n) {
    n -= 1;
    for (var i = 0; i < planslide.length; i++) {
        planslide[i].style.display = "none";
    }
    planslide[n].style.display = "block";
}

plansChange(plans_current);

/*
작성자 : 백정연
작성일 : 210729
사용 페이지 :   planInsert.jsp
함수 설명 : 장소 검색 후 추가 버튼 클릭시 일정 부분에 일정 추가하는 함수
 */
function planInsert(place_name, place_y, place_x) {
    var parent = $('.planI-plansbox[style*="display: block"]');
    var data_date = parent.attr('data-date');
    var num = parent.children().length; // 하위 엘리먼트기에 일정 - 제목 (DAY) 부분도 포함됨

    if (num < 10) { // 일정은 9개까지만 추가 가능
        parent.append(getHtml(place_name, place_y, place_x, num, data_date));
    } else {
        alert("일정은 최대 9개로 제한됩니다.");
    }
}

/*
작성자 : 백정연
작성일 : 210729
사용 페이지 :   planInsert.jsp
함수 설명 : 일정 추가시 일정 관련 <div> 코드 생성해주는 함수
 */
function getHtml(place_name, place_y, place_x, num, data_date) {
    var div = "<div class=\"planI-planbox\" data-date=\"" + data_date + "\" data-y=\"" + place_y + "\" data-x=\"" + place_x + "\" data-planNo=\"\">";
    div += "<div class=\"planI-plannum\">";
    div += "<img src=\"_image/plan/num/number" + num + ".png\" class=\"planI-plannum__img-navy\">";
    div += "<span class=\"planI-plannum__span--time\">시간</span>";
    div += "<span class=\"planI-plannum__span--memo\">메모</span></div>";
    div += " <div class=\"planI-plandetail\">";
    div += " <span class=\"planI-plandetail__span--place\" title=\"" + place_name + "\">" + place_name + "</span>";
    div += "<input type=\"time\" name=\"time\" class=\"planI-plandetail__input--time\" required >";
    div += "<input type=\"text\" name=\"intro\" class=\"planI-plandetail__input--intro\" placeholder=\"20자 내로 메모를 입력해주세요.\"  maxlength=\"20\">";
    div += "<button class=\"planI-plandetail__button--blue\" onclick=\"planDelete(\'" + num + "\')\">&times;</button></div> </div>";

    return div;
}

/*
작성자 : 백정연
작성일 : 210729
사용 페이지 :   planInsert.jsp
함수 설명 : 일정 부분에서 삭제(X) 버튼 클릭시 해당 div 삭제 후 그 후의 일정 순서(숫자) 변경(1개씩 줄여주는)하는 함수
 */
function planDelete(num) {
    var parent = $('.planI-plansbox[style*="display: block"]');
    var kid = parent.children().eq(num); // 일정 부분에 제목도 자식에 포함되기에 index +1
    var next_kids = kid.nextAll();

    kid.detach();

    next_kids.each(function (index, element) {
        var url = "_image/plan/num/number" + num + ".png";
        $(this).find('img').attr("src", url);

        var btn = "planDelete(" + num + ")";
        $(this).find('button').attr("onclick", btn);
        ++num;
    });
}
