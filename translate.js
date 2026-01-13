// 変数代入
let TranslateButton = document.querySelector('.TranslateButton');
let NowLang = "";
let ChangedLang = "";

// 開いた際に更新
window.onload = function () {
    // 日本語に設定
    AllTranslatePage(getLanguageFromHash());
}

function getLanguageFromHash() {
    // URLのハッシュから言語を取得
    const hash = window.location.hash.slice(1); // #を除去
    if (hash === "en" || hash === "zh" || hash === "ja") {
        return hash; // 有効な言語コードがあればそれを返す
    } else {
        return "ja"; // デフォルトは日本語
    }
}

// イベントリスナーの追加
TranslateButton.addEventListener('click', function () {
    AllTranslatePage();
});

function AllTranslatePage() {
    switch (NowLang)
    {
        case "ja":
            Changedlang = "en";
            break;
        case "en":
            Changedlang = "zh";
            break;
        default:
            Changedlang = "ja";
            break;
    }
    
    // 言語データロード
    LoadTranslate(Changedlang);
}

async function LoadTranslate(Changedlang) {
    // jsonファイルからデータを取得
    await fetch(`./assets/lang/${Changedlang}.json`)
        .then(response => response.json())
        .then(data => {
            // 他の要素も同様に更新
            NowLang = Changedlang; // 現在の言語を更新
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
            DisplayText(TranslatedText,key,element);
        } else {
            console.warn(`Translation key "${key}" not found in ${data}`);
        }
    });
}

function DisplayText(TranslatedText,key,element) {
    //もしArray要素なら
    if (Array.isArray(TranslatedText)) {
        //HEADERのサブタイトルはランダムに1つ選択
        if (key === "header_inner_hello_subtitle") {
            var random = Math.floor(Math.random() * (TranslatedText.length));
            console.warn(` [ +ARRAY ] Translated ${key} to: ${TranslatedText[random]} with random index ${random}`);
            element.innerHTML = TranslatedText[random];
        } else {
            console.warn(` [ ARRAY ] Translated ${key} to: ${TranslatedText}`);
            // 配列の各要素をカンマで結合してから分割
            SplitComma(TranslatedText.join(', '), element, key);
        }
    } else {
        console.log(`Translated ${key} to: ${TranslatedText}`);
        // 文字列の場合もカンマ分割を試行
        SplitComma(TranslatedText, element, key);
    }
}

// カンマで分割する関数
function SplitComma(TranslatedText, element, key) {
    if (TranslatedText.includes(',')) {
        const textArray = TranslatedText.split(',').map(text => text.trim());
        let htmlContent = '';

        textArray.forEach(text => {
            htmlContent += `<p class="${key}_split">${text}</p>`;
        });

        element.innerHTML = htmlContent;
        console.log(`Split text into ${textArray.length} parts:`, textArray);
    } else {
        element.innerHTML = TranslatedText;
    }
}