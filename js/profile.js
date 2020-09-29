// 이 페이지가 열렸을 때
window.onload = function () {
    showImage();
    const contents = document.querySelector('div.content');
    // scroll event
    // contents.onscroll = function (e) {}
    contents.addEventListener('scroll', function (e) {
        if (contents.scrollHeight === contents.scrollTop + contents.clientHeight) {
            console.log('bottom hit!!!');
            showImage();
        }
    });
};

// 게시글을 보여주기 위한 배열
const example = [
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku0.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku1.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku2.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku3.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku4.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku5.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku6.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku7.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku8.jpg',
        },
    },
];

// 게시글들 보여주기
function showImage() {
    console.log('showImage() invoked.');

    const wrapper = document.querySelector('div.posts');
    console.log(wrapper);

    /*
    원래의 경우 API 통신을 해서 JSON을 받아오고,
    JSON을 통해 이미지를 띄움.
    */

    // const: 변하지 않는 상수 선언
    // let: 변할 수 있는 변수 선언
    let contents = '';
    for (let i = 0; i < example.length; i++) {
        // contents += '<image src="toeicSpeaking.jpg" />';
        const likes = example[i].likes;
        const comments = example[i].comments;
        const url = example[i].image.url;
        contents += `<div class="image-container" onclick="goToPost(this)" onmouseover="showLikeComment(this)" onmouseout="hideLikeComment(this)">`;
        contents += `<div class="numbers">`;
        contents += `<div class="wrapper">`;
        contents += `<img />`;
        contents += `<span>${likes}</span>`;
        contents += `</div>`; // end of wrapper
        contents += `<div class="wrapper">`;
        contents += `<img />`;
        contents += `<span>${comments}</span>`;
        contents += `</div>`; // end of wrapper
        contents += `</div>`; // end of numbers
        contents += `<img class="post" src="img/${url}" />`;
        contents += `</div>`; // end of image-container
    }
    wrapper.innerHTML += contents;
    // wrapper.innerHTML += contents;
}

// 사진 눌렀을 때 포스트 보이기
function goToPost(target) {
    const url = target.querySelector('img.post').getAttribute('src');
    console.log(url);
    document.querySelector('img#post-main').setAttribute('src', url);
    document.querySelector('div.modal-post').style.display = 'flex';
}

// 마우스 hover했을 때 좋아요랑 댓글 보이기
function showLikeComment(target) {
    target.querySelector('div.numbers').style.display = 'flex';
}

// 마우스 out했을 때 좋아요랑 댓글 숨기기
function hideLikeComment(target) {
    target.querySelector('div.numbers').style.display = 'none';
}

// 포스트 부분에서 다른부분을 눌렀을 시에 포스트 화면 가리기
document.querySelector('div.modal-post').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.modal-post').style.display = 'none';
});

// 스토리 보기
function goToStory() {
    document.querySelector('div.modal-story').style.display = 'flex';
}

// 스토리에서 X부분 눌러야 나가짐
document.querySelector('span.story-close').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.modal-story').style.display = 'none';
    document.querySelector('div.hashtag>img').style.borderColor = '#e8e8e8';
});

// 스토리에 신고버튼
function storyReport() {
    document.querySelector('div.story-report').style.display = 'flex';
}

// 스토리에 신고버튼 부분에서 다른부분을 눌렀을 시에 화면 가리기
document.querySelector('div.story-report').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.story-report').style.display = 'none';
});

// 프로필 setting
function setting() {
    document.querySelector('div.setting').style.display = 'flex';
}

// 프로필 setting 함수
function cancel() {
    document.querySelector('div.setting').style.display = 'none';
}

// 프로필 setting 부분에서 다른부분을 눌렀을 시에 setting 화면 가리기
document.querySelector('div.setting').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.setting').style.display = 'none';
});

// 미니프로필 누르면 수정창 뜨게하기
document.querySelector('div.profile > img').addEventListener('click', function (e) {
    const edit = document.querySelector('div.profile-edit');
    edit.style.display = edit.style.display === 'none' ? 'flex' : 'none';
});

// 미니프로필 팝업에서 다른부분을 눌렀을 시에 팝업 가리기
document.querySelector('div.profile-edit').addEventListener('click', function (e) {
    const bg = this.querySelector('div.bg');
    if (e.target === bg) {
        this.style.display = 'none';
    }
});

// 태그 버튼에 따라 화면 바꾸기
const btnPosts = document.querySelector('div.btn-posts');
const btnIgtv = document.querySelector('div.btn-igtv');
const btnSaved = document.querySelector('div.btn-saved');
const btnTagged = document.querySelector('div.btn-tagged');
const divPosts = document.querySelector('div.posts');
const divIgtv = document.querySelector('div.igtv');
const divSaved = document.querySelector('div.saved');
const divTagged = document.querySelector('div.tagged');

// posts
btnPosts.addEventListener('click', function (e) {
    btnPosts.classList.add('active');
    btnIgtv.classList.remove('active');
    btnSaved.classList.remove('active');
    btnTagged.classList.remove('active');
    divPosts.style.display = 'grid';
    divIgtv.style.display = 'none';
    divSaved.style.display = 'none';
    divTagged.style.display = 'none';
});

// IGTV
btnIgtv.addEventListener('click', function (e) {
    btnPosts.classList.remove('active');
    btnIgtv.classList.add('active');
    btnSaved.classList.remove('active');
    btnTagged.classList.remove('active');
    divPosts.style.display = 'none';
    divIgtv.style.display = 'flex';
    divSaved.style.display = 'none';
    divTagged.style.display = 'none';
});

// saved
btnSaved.addEventListener('click', function (e) {
    btnPosts.classList.remove('active');
    btnIgtv.classList.remove('active');
    btnSaved.classList.add('active');
    btnTagged.classList.remove('active');
    divPosts.style.display = 'none';
    divIgtv.style.display = 'none';
    divSaved.style.display = 'flex';
    divTagged.style.display = 'none';
});

// tagged
btnTagged.addEventListener('click', function (e) {
    btnPosts.classList.remove('active');
    btnIgtv.classList.remove('active');
    btnSaved.classList.remove('active');
    btnTagged.classList.add('active');
    divPosts.style.display = 'none';
    divIgtv.style.display = 'none';
    divSaved.style.display = 'none';
    divTagged.style.display = 'flex';
});

function heart() {
    document.querySelector('a.white-heart').style.display = 'none';
    document.querySelector('a.black-heart').style.display = 'flex';
    document.querySelector('div.profile').style.borderColor = 'transparent';
}

function unHeart() {
    document.querySelector('a.black-heart').style.display = 'none';
    document.querySelector('a.white-heart').style.display = 'flex';
    document.querySelector('div.profile').style.borderColor = 'rgba(var(--i1d, 38, 38, 38), 1)';
}

// 하트 누르면 활동창 뜨게하기
document.querySelector('a.white-heart').addEventListener('click', function (e) {
    const popup = document.querySelector('div.post-activity');
    popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
});

// 활동창 팝업에서 다른부분을 눌렀을 시에 팝업 가리기
document.querySelector('div.post-activity').addEventListener('click', function (e) {
    const bg = this.querySelector('div.bg');
    if (e.target === bg) {
        this.style.display = 'none';
        document.querySelector('a.black-heart').style.display = 'none';
        document.querySelector('a.white-heart').style.display = 'flex';
        document.querySelector('div.profile').style.borderColor = 'rgba(var(--i1d, 38, 38, 38), 1)';
    }
});
