let page = 1;
let isLoading = false;

// 이 페이지가 열렸을 때
window.onload = function () {
    includeModal();
    getPopularImages();
    getRecentImages();
};

function getPopularImages() {
    // GET /api/post/popular
    // query params { }
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('getting popular images is DONE!!!');
            const res = JSON.parse(xhr.response);
            console.log(res);
            if (xhr.status >= 200 && xhr.status < 300) {
                // no error (200~299)
                showPopularImage(res.results);
                // 마지막 post id값 넘겨주기
                maximumId = res.total;
            } else {
                // yes error (400~599)
                alert(`${xhr.status} 오류가 발생했습니다. 관리자에게 문의해주세요.`);
            }
        }
    });
    // query로 보낼 때는 ? 형태로 주소에 추가
    // path로 보낼 때는 / 붙인 후 주소에 추가
    xhr.open('GET', `${BASE_URL}/post/popular`);
    // 서버로 보내는 데이터의 형태가 json 형태라고 알려줌
    xhr.setRequestHeader('Content-Type', 'application/json');
    // body로 담아 보낼 때는 send() 안에 JSON을 문자열로 변환하여 넣기
    xhr.send();
}

function getRecentImages() {
    // GET /api/post/recent
    // query params { page: Number }
    if (isLoading) {
        return;
    }
    isLoading = true;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('getting recent images is DONE!!!');
            const res = JSON.parse(xhr.response);
            console.log(res);
            if (xhr.status >= 200 && xhr.status < 300) {
                // no error (200~299)
                showRecentImage(res);

                // recognize scroll to bottom event
                const content = document.querySelector('div.content');
                content.removeEventListener('scroll', handleContentScrollEvent);
                content.addEventListener('scroll', handleContentScrollEvent);
            } else {
                // yes error (400~599)
                alert(`${xhr.status} 오류가 발생했습니다. 관리자에게 문의해주세요.`);
            }
        }
    });
    // query로 보낼 때는 ? 형태로 주소에 추가
    // path로 보낼 때는 / 붙인 후 주소에 추가
    xhr.open('GET', `${BASE_URL}/post/recent?page=${page}`);
    // 서버로 보내는 데이터의 형태가 json 형태라고 알려줌
    xhr.setRequestHeader('Content-Type', 'application/json');
    // body로 담아 보낼 때는 send() 안에 JSON을 문자열로 변환하여 넣기
    xhr.send();
}

function handleContentScrollEvent(e) {
    if (e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight) {
        console.log('bottom HIT!!!');
        getRecentImages();
    }
}

// 인기 게시물 보여주기
function showPopularImage(res) {
    const wrapper = document.querySelector('div#popular');
    let html = '';
    for (let i = 0; i < res.length; i++) {
        const id = res[i].id;
        const url = res[i].url.thumb;
        const likes = res[i].number.likes;
        const comments = res[i].number.comments;
        html += `<div class="image-container" onclick="goToPost(this, ${id})" onmouseover="showLikeComment(this)" onmouseout="hideLikeComment(this)">`;
        html += `<div class="numbers">`;
        html += `<div class="icon-wrapper">`;
        html += `<div class="likes-icon"></div>`;
        html += `<span>${likes}</span>`;
        html += `</div>`; // end of wrapper
        html += `<div class="icon-wrapper">`;
        html += `<div class="comments-icon"></div>`;
        html += `<span>${comments}</span>`;
        html += `</div>`; // end of wrapper
        html += `</div>`; // end of numbers
        html += `<img class="post" src="${BASE_URL}${url}" />`;
        html += `</div>`; // end of image-container
    }
    wrapper.innerHTML += html;
}

// 최신 게시물 보여주기
function showRecentImage(res) {
    page = res.next;
    const wrapper = document.querySelector('div#recent');
    let html = '';
    for (let i = 0; i < res.results.length; i++) {
        const id = res.results[i].id;
        const url = res.results[i].url.thumb;
        const likes = res.results[i].number.likes;
        const comments = res.results[i].number.comments;
        html += `<div class="image-container" onclick="goToPost(this, ${id})" onmouseover="showLikeComment(this)" onmouseout="hideLikeComment(this)">`;
        html += `<div class="numbers">`;
        html += `<div class="icon-wrapper">`;
        html += `<div class="likes-icon"></div>`;
        html += `<span>${likes}</span>`;
        html += `</div>`; // end of wrapper
        html += `<div class="icon-wrapper">`;
        html += `<div class="comments-icon"></div>`;
        html += `<span>${comments}</span>`;
        html += `</div>`; // end of wrapper
        html += `</div>`; // end of numbers
        html += `<img class="post" src="${BASE_URL}${url}" />`;
        html += `</div>`; // end of image-container
    }
    wrapper.innerHTML += html;
    isLoading = false;
}

// 팔로우버튼
function follow() {
    const btn = document.querySelector('button.follow');
    btn.innerText = btn.innerText === '팔로우' ? '팔로잉' : '팔로우';
    // btn.classList.add('active');
    // btn.classList.remove('active');
    // 두가지 상태로 변할수있게 지정
    btn.classList.toggle('active');
}
