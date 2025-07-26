// ES6のimportは使わず、CDNから読み込んだLenisを直接使用
const lenis = new Lenis({
    duration: 1.2, // スクロールの継続時間
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // イージング関数
    direction: 'vertical', // スクロール方向
    gestureDirection: 'vertical', // ジェスチャー方向
    smooth: true, // スムーススクロールを有効
    mouseMultiplier: 1, // マウスホイールの感度
    smoothTouch: false, // タッチデバイスでのスムーススクロール
    touchMultiplier: 2, // タッチの感度
    infinite: false, // 無限スクロールを無効
});

// アニメーションフレームループ
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

// ループを開始
requestAnimationFrame(raf);

// ページ読み込み完了後に初期化（オプション）
document.addEventListener('DOMContentLoaded', () => {
    console.log('Lenis initialized');
});