// 変数代入
let TranslateButton = document.querySelector('.TranslateButton');
let NowLang = "";

// 開いた際に更新
window.onload = function () {
    // 日本語に設定
    AllTranslatePage("ja");
}

// イベントリスナーの追加
TranslateButton.addEventListener('click', function () {
    AllTranslatePage("change");
});

function AllTranslatePage(ChangeLang) {
    //変更設定がされた時の処理
    if (ChangeLang === "change") {
        if (NowLang === "ja") ChangeLang = "en";
        else if (NowLang === "en") ChangeLang = "zh";
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
    // 言語データロード
    LoadTranslate(ChangeLang);
}

async function LoadTranslate(ChangeLang) {
    // jsonファイルからデータを取得
    await fetch(`./lang/${ChangeLang}.json`)
        .then(response => response.json())
        .then(data => {
            // 他の要素も同様に更新
            NowLang = ChangeLang; // 現在の言語を更新
            ApplyTranslate(data);
        })
        .catch(error => console.error('Error fetching translation:', error));
}

function ApplyTranslate(data) {
    // ぺージ内の全要素を取得
    let AllElement = document.querySelectorAll('[id^="%"]')
    AllElement.forEach(element => {
        console.log(element);
        // 要素のIDから言語キーを取得
        let key = element.id.slice(1); // %を除去
        // データから対応するテキストを取得
        let TranslatedText = data[key];
        // テキストが存在する場合は更新
        if (data[key]) {
            //もしArray要素なら
            if (Array.isArray(TranslatedText)) {
                console.warn(` [ ARRAY ] Translated ${key} to: ${TranslatedText}`);
                element.innerHTML = TranslatedText;
            } else {
                console.log(`Translated ${key} to: ${TranslatedText}`);
                element.innerHTML = TranslatedText;
            }

        } else {
            console.warn(`Translation key "${key}" not found in ${data}`);
        }
    });
}