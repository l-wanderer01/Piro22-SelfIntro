/* 다크모드 */
const profilePhoto = document.querySelector(".profile_photo");

profilePhoto.addEventListener("click", () => {
    // if (document.body.className == 'dark-mode') {
    //     document.body.className = '';
    // } else {
    //     document.body.className = 'dark-mode';
    // }

    // DOM 요소에 지정한 클래스 값이 없으면 추가하고, 있다면 제거
    document.body.classList.toggle('dark-mode');
})

/* 스크롤 모드 */
/* for문 이용 */
// const sections = document.querySelectorAll('.right_container section'); // 리스트로 가져옴

/* for 문 */
// for (let index = 0; index < sections.length; index++) {
//     const section = sections[index];
//     section.addEventListener('click', function(event) {
//         const sectionWidth = section.offsetWidth; // margin을 제외한 padding 값, border 값까지 계산한 값
//         const clickX = event.clickx - section.getBoundingClientRect().left; // section의 왼쪽에서부터 클릭한 위치까지의 거리

//         if (clickX < sectionWidth / 2) { // 만약 section의 왼쪽을 클릭했다면
//             if (index !== 0) {
//                 section.style.display = "none";
//                 section[index - 1].style.display = 'flex';
//             }
//         }
//         else {
//             if (index != (section.length - 1)) {
//                 section.style.display = "none";
//                 section[index + 1].style.display = 'flex';
//             }
//         }
//     })
// }

// const sections = document.querySelectorAll('.right_container section');
// let currentIndex = 0;

// // sections는 위 작용을 통해 반환된 NodeList
// sections.forEach((section, index) => {
//     // 각 section 요소가 이 NodeList의 개별 항목
//     // index는 forEach에서 현재 순회 중인 요소의 위치를 나타냄
//     // index는 forEach 메서드가 자동으로 계산해서 콜백 함수의 두 번째 매개변수로 전달하므로, 별도로 초기화하지 않아도 됨

//     section.addEventListener('click', function (event) {
//         const sectionWidth = section.offsetWidth;  // margin을 제외한 padding 값, border 값까지 계산한 값을 가져옴.

//         // event.clickX: 클릭한 위치의 X 좌표 (뷰포트 기준)
//         // section.getBoundingClickRect().left: section의 가장 왼쪽 가장자리의 X 좌표 (뷰포트 기준)
//         // 두 값을 빼줌으로써 section 내에서 클릭한 위치의 X 좌표를 계산
//         const clickX = event.clickX - section.getBoundingClientRect().left;

//         if (clickX < sectionWidth / 2) {  // 만약 section의 왼쪽을 클릭했다면
//             if (index != 0) {  // 더 왼쪽으로 갈 section이 있다면
//                 section.style.display = 'none';
//                 sections[index - 1].style.display = 'flex';
//                 currentIndex = index - 1;
//             }
//         } else {  // 만약 section의 오른쪽을 클릭했다면
//             if (index != (section.length - 1)) {  // 더 오른쪽으로 갈 section이 있다면
//                 section.style.display = 'none';
//                 sections[index + 1].style.display = 'flex';
//                 currentIndex = index + 1;
//             }
//         }
//     })
// })

// setInterval(() => {
//     sections[currentIndex].style.display = 'none';
//     if (currentIndex == (sections.length - 1)) {  // 더 오른쪽으로 갈 section이 없다면 (즉, 마지막 section)
//         currentIndex = 0;  // 처음의 section으로 이동
//     } else {
//         currentIndex++;
//     }

//     // currentIndex = (currentIndex + 1) % sections.length;
//     // section은 총 4개 currentIndes (0 ~ 3)
//     // currentIndex가 3이라고 한다면
//     // currentIndex = 4 % 4 = 0
//     sections[currentIndex].style.display = 'flex';
// }, 3000);

/* 함수화 */

fetch("https://m.search.naver.com/p/csearch/content/apirender.nhn?where=nexearch&pkid=387&u2=20010423&q=생년월일+운세&u1=m&u3=solar&u4=12&_=1719518803829")
.then((response) => response.json())  // 응답을 JSON으로 파싱
.then(data => {
    const htmlString = data.flick[0]; // 첫 번째 항목 선택
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const fortune = doc.querySelector('dd b').textContent;
    const fortuneText = doc.querySelector('dd p').textContent;
    console.log(fortune); // 추출한 텍스트 출력
    console.log(fortuneText); // 추출한 텍스트 출력

    const fortuneSection = document.createElement("section"); // 오늘의 운세 section
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = "오늘의 운세";
    const fortuneE = document.createElement("h3");
    fortuneE.style.margin = 0;
    fortuneE.textContent = fortune;
    const fortuneTextE = document.createElement("p"); // 오늘의 운세 풀이 추가
    fortuneTextE.textContent - fortuneText;

    fortuneSection.append(sectionTitle);
    fortuneSection.append(fortuneE);
    fortuneSection.append(fortuneTextE);

    const contactSection = document.querySelector(".contact");
    // contactSection.before(fortuneSection)
    contactSection.after(fortuneSection);
    // section 초기화 및 이벤트 리스너 추가
    initializeSections();
});

    const sections = document.querySelectorAll(".right_container section");
let currentIndex = 0;

const showAfterSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })  // 현재 section 숨기기
    if (currentIndex == sections.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    sections[currentIndex].style.display = 'flex';  // 다음 section 보여주기
}
const showBeforeSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })
    if (currentIndex == 0) {
        currentIndex = sections.length - 1;
    } else {
        currentIndex--;
    }
    sections[currentIndex].style.display = 'flex';
}

// 실행되는 인터벌의 고유 ID를 반환 -> intervalId로 저장
// showAfterSection이라는 함수를 3초마다 반복 실행
let intervalId = setInterval(showAfterSection, 3000);

const resetInterval = () => {
    // 현재 실행 중인 인터벌(intervalId)을 중단
    // 지정된 ID와 연결된 setInterval 작업 중단
    // 현재 실행 중인 인터벌만 취소하는 역할을 수행하므로, 새로운 인터벌을 생성하거나 재시작하지 않음 -> 새로운 setInterval 필요
    clearInterval(intervalId);
    // 새롭게 intervalID를 저장함으로써 이전 인터벌은 중단되고, 새로운 3초 주기의 인터벌 시작
    intervalId = setInterval(showAfterSection, 3000);
}

sections.forEach((section, index) => {
    section.addEventListener("click", (event) => {
        const sectionWidth = section.offsetWidth;
        const clickX = event.clientX - section.getBoundingClientRect().left;

        if (clickX < sectionWidth / 3) {  // 왼쪽 1/3 클릭 시 이전 section으로 이동
            showBeforeSection();
            resetInterval();
        } else if (clickX > sectionWidth * 2 / 3) {  // 오른쪽 1/3 클릭 시 다음 section으로 이동
            showAfterSection();
            resetInterval();
        } else {  // 중간 1/3 클릭 시 자동 넘김 토글
            if (intervalId) {
                clearInterval(intervalId);  // 자동 넘김 중지
                // intervalId 값은 여전히 남아있으므로 null 값을 넣어줌으로써 더 이상 유효하지 않게 함
                intervalId = null;
            } else {
                intervalId = setInterval(showAfterSection, 3000);  // 자동 넘김 재개
            }
        }
    });
});
}