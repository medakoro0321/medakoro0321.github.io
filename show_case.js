//assets/images/show_case内のファイル数
const ShowCaseImageFiles = 3;
ShowCaseImageSet();


//画像をそれぞれ設置
function ShowCaseImageSet() {
    for (let i = 0; i < ShowCaseImageFiles; i++) {
        //画像のパスを設定
        const imagePath = `assets/images/showcase/pic_${i + 1}.png`;
        //画像要素を作成
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = `Showcase Image ${i + 1}`;
        imgElement.className = 'showcase-image';

        //画像を表示する要素に追加
        document.getElementById('showcase_pictures').appendChild(imgElement);
        
        imgElement.onload = function () {
            // 画像が読み込まれた後の処理
            const displayHeight = this.offsetHeight;
            console.log(`DisplayHeight{i + 1}: ${displayHeight}px`);
            // 画像の高さからマージンを設定
            this.style.height = `${displayHeight}px`;
        }
    }
}



let currentSlide = 0;
const images = document.querySelectorAll('.showcase-image');

//一番最初に呼ぶ
showSlide(0);

function showSlide(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

// 自動スライド
setInterval(() => {
    currentSlide = (currentSlide + 1) % images.length;
    showSlide(currentSlide);
}, 5000);