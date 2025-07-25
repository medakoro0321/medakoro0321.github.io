// 変数代入
let TranslateButton = document.querySelector('.TranslateButton');
let NowLang = "";

// 開いた際に更新
window.onload = function () {
    // 日本語に設定
    AllTranslatePage(ja);
}

// イベントリスナーの追加
TranslateButton.addEventListener('click', function () {
    AllTranslatePage(change);
});

function AllTranslatePage(ChangeLang) {
    //変更設定がされた時の処理
    if (ChangeLang === "change") {
        if (NowLang === "ja") ChangeLang = "en";
        else if (NowLang === "en") ChangeLang = "zh";
        else if (NowLang === "zh") ChangeLang = "ja";
        else ChangeLang = "ja"; // 初期値を日本語に設定
    } else {
        // 言語ごとの処理
        switch (ChangeLang) {
            case "ja":
                //ja

                break;
            case "en":
                //en
                break;
            case "zh":
                //zh
                break;
        }
    }
    // 言語の変更
    ApplyTrasnlate(ChangeLang);
}

function ApplyTrasnlate(ChangeLang) {
    // jsonファイルからデータを取得
    fetch(`./lang/${ChangeLang}.json`)
        .then(response => response.json())
        .then(data => {
            // 各要素のテキストを更新
            document.querySelector('.TranslateButton').textContent = data.TranslateButton;
            // 他の要素も同様に更新
            NowLang = ChangeLang; // 現在の言語を更新
        })
        .catch(error => console.error('Error fetching translation:', error));
}