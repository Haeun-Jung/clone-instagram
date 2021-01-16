const BASE_URL = 'https://sjud325.asuscomm.com/api';

function includeModal(callback) {
    const xhr = new XMLHttpRequest(); // API 통신하기 위한 객체 생성
    xhr.addEventListener('readystatechange', function () {
        // XMLHttpRequest 객체의 readyState가 변경될 때마다 호출
        // OPEN, LOADING, HEADERS_RECEIVED, DONE
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('getting modal is DONE!!!');
            const parent = document.createElement('div');
            parent.innerHTML = xhr.responseText;
            for (const child of parent.childNodes) {
                document.body.appendChild(child);
            }

            // 포스트 부분에서 다른부분을 눌렀을 시에 포스트 화면 가리기
            document.querySelector('div.modal-post').addEventListener('click', function (e) {
                if (e.target !== this) {
                    return; // 현재 함수 빠져나가기
                }
                console.log(e.target);
                document.querySelector('div.modal-post').style.display = 'none';
            });

            // post에서 X부분 눌러야 나가짐
            document.querySelector('svg.post-close').addEventListener('click', function (e) {
                console.log(e.target);
                document.querySelector('div.modal-post').style.display = 'none';
            });

            // 스토리에서 X부분 눌러야 나가짐
            document.querySelector('svg.story-close').addEventListener('click', function (e) {
                console.log(e.target);
                document.querySelector('div.modal-story').style.display = 'none';
            });

            // 스토리에 신고버튼 부분에서 다른부분을 눌렀을 시에 화면 가리기
            document.querySelector('div.story-report').addEventListener('click', function (e) {
                if (e.target !== this) {
                    return; // 현재 함수 빠져나가기
                }
                document.querySelector('div.story-report').style.display = 'none';
            });

            // 포스트 메뉴 부분에서 다른부분을 눌렀을 시에 메뉴 화면 가리기
            document.querySelector('div.post-menu').addEventListener('click', function (e) {
                if (e.target !== this) {
                    return; // 현재 함수 빠져나가기
                }
                console.log(e.target);
                document.querySelector('div.post-menu').style.display = 'none';
            });

            // 포스트 댓글에 신고버튼 부분에서 다른부분을 눌렀을 시에 화면 가리기
            document.querySelector('div.comment-report').addEventListener('click', function (e) {
                if (e.target !== this) {
                    return; // 현재 함수 빠져나가기
                }
                console.log(e.target);
                document.querySelector('div.comment-report').style.display = 'none';
            });

            // post 댓글버튼 누르면 textarea에 초점
            document.querySelector('button.comment').addEventListener('click', function (e) {
                document.querySelector('div.comment-wrapper > textarea').focus();
            });

            //  post 좋아요 버튼
            document.querySelector('svg.like-no').addEventListener('click', function (e) {
                document.querySelector('svg.like-no').style.display = 'none';
                document.querySelector('svg.like-yes').style.display = 'flex';
            });

            // post 좋아요취소 버튼
            document.querySelector('svg.like-yes').addEventListener('click', function (e) {
                document.querySelector('svg.like-yes').style.display = 'none';
                document.querySelector('svg.like-no').style.display = 'flex';
            });

            // post 저장 버튼
            document.querySelector('svg.save-no').addEventListener('click', function (e) {
                document.querySelector('svg.save-no').style.display = 'none';
                document.querySelector('svg.save-yes').style.display = 'flex';
            });

            // post 저장취소 버튼
            document.querySelector('svg.save-yes').addEventListener('click', function (e) {
                document.querySelector('svg.save-yes').style.display = 'none';
                document.querySelector('svg.save-no').style.display = 'flex';
            });

            // post direct 팝업에서 다른부분을 눌렀을 시에 팝업 가리기
            document.querySelector('div.modal-direct').addEventListener('click', function (e) {
                if (e.target !== this) {
                    return; // 현재 함수 빠져나가기
                }
                document.querySelector('div.modal-direct').style.display = 'none';
            });
        }
    });
    xhr.open('GET', 'modal.txt');
    xhr.send();
}

// post 해당 id값 받기
let currentId, maximumId;

// 사진 눌렀을 때 포스트 보이기
function goToPost(target, id) {
    // GET /api/post/{id}
    // path params { id: Number }
    currentId = id;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const res = JSON.parse(xhr.response);
                // div.top 자식의 div.posting 자식의 div태그 값을 tags변수에 저장
                const tags = document.querySelector('div.top > div.posting > div');
                // tags값 비우기
                tags.innerHTML = '';
                // p태그 요소 만들어서 변수 p에 저장
                const p = document.createElement('p');
                // p태그에 comment 클래스 추가
                p.classList.add('comment');
                // a태그 요소 만들어서 변수 a에 저장
                const a = document.createElement('a');
                // a태그에 id 클래스 추가
                a.classList.add('id');
                // a 내용으로 res변수의 user 값 저장
                a.innerText = res.user;
                // p 자식 요소에 a 넣기
                p.appendChild(a);
                // p에 res변수의 content값 추가
                p.innerHTML += res.content;
                // tags 자식 요소에 p 넣기
                tags.appendChild(p);

                for (let i = 0; i < res.tags.length; i++) {
                    const a = document.createElement('a');
                    a.classList.add('tag');
                    a.innerText = `#${res.tags[i]}`;
                    tags.appendChild(a);
                }

                // 현재 post id값이 첫번째 post id 값이면 이전 버튼 없애기
                if (currentId === 1) {
                    document.querySelector('div.previous').style.display = 'none';
                } else {
                    document.querySelector('div.previous').style.display = 'block';
                }

                // 현재 post id값이 마지막 post id 값이면 다음 버튼 없애기
                if (currentId === maximumId) {
                    document.querySelector('div.next').style.display = 'none';
                } else {
                    document.querySelector('div.next').style.display = 'block';
                }
                document.querySelector('img#post-main').setAttribute('src', `${BASE_URL}${res.image}`);
                document.querySelector('div.user > img').setAttribute('src', `${BASE_URL}${res.profile}`);
                document.querySelector('div.top > img').setAttribute('src', `${BASE_URL}${res.profile}`);
                document.querySelector('div.user > a').innerText = res.user;
                document.querySelector('div.top > div.posting p.time').innerText = res.diff_time;

                const wrapper = document.querySelector('div.text');
                for (const container of wrapper.querySelectorAll('div.comment-container')) {
                    container.remove();
                }
                let html = '';
                for (let i = 0; i < res.comments.length; i++) {
                    html += `<div class="comment-container" onmouseover="showReport(this)" onmouseout="hideReport(this)">`;
                    html += `<img src="${BASE_URL}${res.comments[i].profile}">`;
                    html += `<div class="posting">`;
                    html += `<div>`;
                    html += `<p class="comment"><a class="id">${res.comments[i].user}</a>${res.comments[i].content}</p>`;
                    html += `</div>`; // end of div
                    html += `<div class="info">`;
                    html += `<p class="time">${res.comments[i].diff_time}</p>`;
                    html += `<p class="like">좋아요 ${res.comments[i].likes}개</p>`;
                    html += `<p class="reply">답글 달기</p>`;
                    html += `</div>`; // end of info
                    html += `<button class="option" onclick="commentReport()">...</button>`;
                    html += `<svg class="heart-no" onclick="heartNo(this)" viewBox="0 0 48 48"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
                    html += `<svg class="heart-yes" onclick="heartYes(this)" viewBox="0 0 48 48"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
                    html += `</div>`; // end of posting
                    html += `</div>`; // end of comment-container
                }

                wrapper.innerHTML += html;
                document.querySelector('div.post-date').innerText = res.timestamp;
                document.querySelector('button.likes-count').innerText = `좋아요 ${res.likes.toLocaleString()}개`;
                document.querySelector('div.modal-post').style.display = 'flex';
            } else {
                alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
            }
        }
    });
    xhr.open('GET', `${BASE_URL}/post/${id}`);
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

// 마우스 hover했을 때 좋아요랑 댓글 보이기
function showLikeComment(target) {
    target.querySelector('div.numbers').style.display = 'flex';
}

// 마우스 out했을 때 좋아요랑 댓글 숨기기
function hideLikeComment(target) {
    target.querySelector('div.numbers').style.display = 'none';
}

// 스토리 보기
function goToStory() {
    document.querySelector('div.modal-story').style.display = 'flex';
}

// 포스트 메뉴 열기 함수
function postMenu() {
    document.querySelector('div.post-menu').style.display = 'flex';
}

// 포스트 메뉴, 댓글 신고 취소 함수
function cancel() {
    document.querySelector('div.post-menu').style.display = 'none';
    document.querySelector('div.comment-report').style.display = 'none';
    document.querySelector('div.story-report').style.display = 'none';
    document.querySelector('div.modal-direct').style.display = 'none';
    const setting = document.querySelector('div.setting');
    if (setting) {
        setting.style.display = 'none';
    }
}

// 스토리에 신고버튼
function storyReport() {
    document.querySelector('div.story-report').style.display = 'flex';
}

// 포스트 댓글 focus할 때 신고버튼 보이기
function showReport(target) {
    target.querySelector('button.option').style.display = 'flex';
}

// 포스트 댓글 focus out할 때 신고버튼 안보이기
function hideReport(target) {
    target.querySelector('button.option').style.display = 'none';
}

// 포스트 댓글에 신고버튼
function commentReport() {
    document.querySelector('div.comment-report').style.display = 'flex';
}

//  post 댓글 좋아요 버튼
function heartNo(target) {
    // heartNO 함수를 실행하는 요소의 스타일을 변경
    target.style.display = 'none';
    // heartNO 함수를 실행하는 요소의 다음 요소의 스타일을 변경
    target.nextSibling.style.display = 'flex';
}

// post 댓글 좋아요 취소 버튼
function heartYes(target) {
    target.style.display = 'none';
    target.previousSibling.style.display = 'flex';
}

//post에서 사진더블클릭시 좋아요 적용
function dblClickLike() {
    // POST /api/post/like
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // no error (200~299)
                document.querySelector('div.heart-wrapper').style.display = 'flex';
                document.querySelector('svg.like-no').style.display = 'none';
                document.querySelector('svg.like-yes').style.display = 'flex';
                // 일정시간 후에 하트 없어짐
                setTimeout(function () {
                    document.querySelector('div.heart-wrapper').style.display = 'none';
                }, 1500);
            } else {
                // yes error (400~599)
                alert(`${xhr.status} 오류가 발생했습니다. 관리자에게 문의해주세요.`);
            }
        }
    });
    xhr.open('POST', `${BASE_URL}/post/like`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ id: 0 }));
}

// 검색창에서 x표시 누를 때 빈칸만들기
function searchCancel() {
    document.querySelector('input.search').value = '';
}

// 검색창 focus 잡힐때
function searchFocus() {
    const search = document.querySelector('input.search');
    search.style.textAlign = 'left';
    search.style.color = '#242424';
    document.querySelector('div.search-icon').style.left = '10px';
    document.querySelector('div.search-cancel').style.display = 'flex';
}

// 검색창 focus 초점을 벗어날 때
function searchFocusOut() {
    const search = document.querySelector('input.search');
    search.style.textAlign = 'center';
    search.style.color = '#d4d4d4';
    if (search.value.length > 0) {
        document.querySelector('div.search-icon').style.left = '10px';
    } else {
        document.querySelector('div.search-icon').style.left = '80px';
    }
    document.querySelector('div.search-cancel').style.display = 'none';
}

// post direct 팝업
function direct() {
    document.querySelector('div.modal-direct').style.display = 'flex';
}

// post textarea입력시 게시 버튼 색 변경
function comment() {
    if (document.querySelector('textarea').value !== '') {
        document.querySelector('button.submit').style.opacity = '1.0';
    } else {
        document.querySelector('button.submit').style.opacity = '0.3';
    }
}

function postPrevious() {
    currentId -= 1;
    goToPost(null, currentId);
}

function postNext() {
    currentId += 1;
    goToPost(null, currentId);
}
