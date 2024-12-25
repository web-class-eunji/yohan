 // 글씨 써지는 부분
 let typeText = document.querySelector(".interactive-text-area");
 let textToBeTypedArr = ["영화, 그 이상의 특별한 경험", "관람을 넘어선 공감각적 경험", "오직 CGV에서."];
 let index = 0, isAdding = true, textToBeTypedIndex = 0;
 let isPlaying = false; // 애니메이션이 실행 중인지 체크
 let timeoutId;  // setTimeout ID를 저장할 변수
 let lastScrollTop = 0;  // 마지막 스크롤 위치를 저장

 // 애니메이션 초기화
 function resetAnimation() {
     index = 0;  // 인덱스를 0으로 초기화
     isAdding = true;  // 글자를 추가하는 상태로 초기화
     textToBeTypedIndex = 0;  // 첫 번째 문구부터 시작
     typeText.innerText = ""; // 텍스트를 비워서 애니메이션 처음부터 시작
     isPlaying = false; // 애니메이션 상태를 종료 상태로 설정
     clearTimeout(timeoutId); // 애니메이션 중단
 }

 function playAnim() {
     timeoutId = setTimeout(function () {
         typeText.innerText = textToBeTypedArr[textToBeTypedIndex].slice(0, index);

         if (isAdding) {
             if (index > textToBeTypedArr[textToBeTypedIndex].length) {
                 isAdding = false;
                 timeoutId = setTimeout(function () {
                     playAnim();
                 }, 1000); // 문구 타이핑 후 1초 대기
                 return;
             } else {
                 index++;
             }
         } else {
             if (index === 0) {
                 isAdding = true;
                 textToBeTypedIndex = (textToBeTypedIndex + 1) % textToBeTypedArr.length;
             } else {
                 index--;
             }
         }
         playAnim();
     }, isAdding ? 100 : 10);
 }

 // 스크롤 방향을 감지하는 함수
 function detectScrollDirection() {
     let st = window.pageYOffset || document.documentElement.scrollTop;
     let direction = (st > lastScrollTop) ? 'down' : 'up'; // 스크롤 방향을 감지
     lastScrollTop = st <= 0 ? 0 : st; // 스크롤 값을 갱신
     return direction;
 }

 // 스크롤 이벤트로 intro-section에 도달했을 때 애니메이션 시작/중지
 let observer = new IntersectionObserver((entries) => {
     let entry = entries[0];
     let direction = detectScrollDirection(); // 스크롤 방향 감지

     if (entry.isIntersecting && !isPlaying) {
         // 요소가 화면에 들어올 때 애니메이션 시작
         isPlaying = true;  // 애니메이션이 이미 실행 중임을 표시
         typeText.style.fontSize = "24px";
         typeText.style.fontWeight = "bold";
         playAnim(); // 애니메이션 실행
     }

     // 요소가 뷰에서 벗어났을 때 애니메이션 상태 초기화
     else if (!entry.isIntersecting && isPlaying) {
         // 위로 스크롤해서 벗어났을 때도 초기화
         resetAnimation(); // 스크롤 방향과 상관없이 초기화
     }

 }, {
     threshold: 0,  // 요소가 화면에 0%라도 들어오면 교차로 간주
     rootMargin: "0px 0px -50% 0px"  // 뷰포트의 아래쪽에서 50% 이상 벗어나면 초기화
 });

 // #intro-section을 관찰 대상으로 지정
 observer.observe(document.querySelector("#intro-section"));