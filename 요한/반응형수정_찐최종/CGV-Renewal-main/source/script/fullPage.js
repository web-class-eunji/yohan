// 풀페이지 스크롤
const intro = document.querySelector('.intro'); // 영상 들어있는 부분
const wrap = document.querySelector('.wrap'); // 그 외 밑에 들어갈 모든 부분
const videoSection = document.querySelector('#video-section');
// if (window.innerWidth < 385) {
    // scrollStart(false);
    // isIntro = false
// }

let isIntro = true;
// 현재 인트로 화면이 활성화 되어있는지 여부를 나타냄
// 처음에는 인트로 화면이 보이므로 ture

let moving = false;
// 화면 전환중인지 여부를 나타냄
// 전환중일때는 true가 되어 중복 전환을 방지함

// 함수를 호출하여 초기 스크롤 위치를 확인
// 현재 스크롤의 위치라 0이 아니라면 인트로 화면을 건너뛰고 새로고침한 구간을 유지함
checkScroll()

window.addEventListener('load', checkWidth);
window.addEventListener('resize', checkWidth);

function checkScroll() {
    if (window.scrollY !== 0) {
        // 브라우저를 새로고침 했을 때 스크롤의 Y값이 0이 아니라면
        scrollStart(false);
        // scrollStart 함수를 호출하고
        isIntro = false;
        // isIntro에 false값을 대입해 인트로 화면을 비활성화함
    } 
}

function checkWidth(){
    if(window.innerWidth <= 878) {
        isIntro = false;
        moving = false;
        intro.style.transform = `translateY(0)`;
        wrap.style.transform = `translateY(0)`;
        intro.style.transition = 'none';
        wrap.style.transition = 'none';
    }
}

function scrollStart(transition = true) {
    // transition이라는 매개변수에 기본값 true를 지정해준다.
    // 함수가 호출될 때 transition 값이 주어지지 않으면 자동으로 함수를 생성할 때 대입한 true로 설정된다. 
    if (!moving && isIntro && window.innerWidth >= 878) {
        // moving 변수가 false일때 내부 코드를 실행한다
        // moving이 false라는 것은 화면 전환이 현재 진행 중이지 않다는 뜻
        moving = true;
        // 화면전환이 시작되면 moving=true로 전환하여 전환이 진행 중임을 표시
        // 이렇게 moving이 true로 설정된 동안에는 다시 이 함수가 호출되어도 조건에 따라 전환이 발생하지 않는다.
        setTimeout(() => {
            moving = false
        }, 1000);
        // moving=true;로 설정되어 화면전환이 일어나는 1초 후에 moving=false로 다시 대입하여 변경함
        // 즉 moving=true로 화면 전환하는 시간인 1초가 지나면 moving이 다시 false가 되어 이후에 새로운 전환을 할 수 있음

        if (transition) {
            // 매개변수인 transition가 true일경우
            // 아무것도 대입하지 않았으니 처음 대입한 true값을 유지함
            intro.style.transition = '1s';
            // 영상을 담고있는 섹션의 스타일의 transition 속성을 1초 적용함.
            wrap.style.transition = '1s';
            // 영상 밑 모든 부분을 담고있는 wrap에도 똑같이 1초 적용
        } else {
            intro.style.transition = 'none';
            wrap.style.transition = 'none';
        }


        intro.style.transform = `translateY(-100%)`
        // 인트로부분을 위로 이동하여 화면 밖으로 숨기고
        wrap.style.transform = `translateY(0)`
        // wrap 부분은 브라우저의 시작점에 붙게됨

        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, transition ? 1000 : 0);
        // 화면전환이 완료되면 body의 overflow 속성을 auto로 설정해서 hidden으로 막아놨던 스크롤을 다시 활성화해줌
        // 화면전환 중이야? 전환이 있으면 1초 후에 활성화 : transition의 값이 false로 설정되어있다면 바로 overflow = 'auto'를 활성화
    }
}

function returnIntro() {
    // 본 화면을 숨기고 인트로 화면으로 돌아가는 역할을 하는 함수
    if (!moving && !isIntro && window.innerWidth > 878) {
        // moving 변수가 false일때 내부 코드를 실행한다
        moving = true;
        // 무빙에 false를 대입하여 전환 중 상태로 표시한다.
        setTimeout(() => {
            moving = false
        }, 1000);
        // 1초 후에 false를 대입

        document.body.style.overflow = 'hidden';
        // 히든으로 스크롤바를 없애줌
        intro.style.transition = '1s';
        wrap.style.transition = '1s';
        intro.style.transform = `translateY(0)`
        // 위로 100% 올라가있던 인트로섹션의 translateY에 0을 대입하여 브라우저의 시작점에 위치하도록 설정함 
        wrap.style.transform = `translateY(100vh)`
        // 브라우저의 0값 즉 시작점에 위치하던 wrap을 100vh값을 대입해 화면에서 보이지 않도록 설정
    }
}

window.addEventListener('mousewheel', (e) => {
    // mousewheel 이벤트 리스너를 추가하여 마우스 휠로 화면을 스크롤 할 때 전환을 제어한다.
    if (isIntro && e.deltaY > 0) {
        // isIntro가 true이면서 (현재 인트로 화면이 활성화된 상태)
        // e.deltaY > 0 (마우스 휠이 아래로 스크롤 될 경우)
        setTimeout(() => {
            isIntro = false;
        }, 1000);
        // 1초 후에 isIntro를 false로 변경한다 이유는 scrollStart(true)를 통해 인트로 화면을 위로 사라지게 만든 뒤 1초 후에 wrap이 완전히 나타난 후에만 인트로 화면이 비활성화 되었다고 표시하기 위함
        scrollStart(true)
        // scrollStart 함수를 호출하여 인트로 화면을 위로 사라지게 하고 wrap본 화면이 나타나도록 한다.
        console.log('아래로는 내렸다')
    }

    if (window.scrollY === 0 && !isIntro && e.deltaY < 0 && window.innerWidth > 878) {
        // 현재 스크롤의 위치가 0일때 즉 페이지 맨 위에 있을때만 실행됨
        // isIntro가 false인경우 즉 wrap이 보여지고 있을 경우
        // 사용자가 스크롤을 위로 올리고 있을 때
        // 다 합쳐서 해석하면 현재 wrap이 브라우저의 시작점에 붙어있고 사용자는 위로 올리려고 스크롤중일 때
        setTimeout(() => {
            isIntro = true;
            // inIntro를 true로 변경
        }, 1000);
        returnIntro()
        // 인트로 화면으로 전환된 이후 1초가 지나면 인트로 화면이 활성화 되었다고 표시됨
        console.log('위로는 올렸다')
    }
})