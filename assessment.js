'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


/**
 * 指定した要素の子供を全て削除
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        //element.firstChildがtrueで有る限り　つまり、子供が有る限り
        element.removeChild(element.firstChild);
    }
}

//診断ボタンクリック時動作
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //未入力時には処理終了
        return;
    }

    //1.診断結果表示エリアの作成
    //1-1.結果エリアの初期化
    removeAllChildren(resultDivided);

    //1-2.Title作成
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    ///Title append
    resultDivided.appendChild(header);

    //1-3.診断結果埋め込み
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    ///結果append
    resultDivided.appendChild(paragraph);

    //2.tweetエリアの作成
    //2-1.tweetエリアの初期化
    removeAllChildren(tweetDivided);

    //2-2. tweetボタンの作成
    const tweet = document.createElement('a');
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' + 
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';
    tweet.setAttribute('href', hrefValue);
    tweet.setAttribute('class', 'twitter-hashtag-button');
    tweet.setAttribute('data-text', result);
    tweet.innerText = 'Tweet #あなたのいいところ';
    //ボタンappend
    tweetDivided.appendChild(tweet);

    //scriptエリアの作成
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);



};

//テキストフィールドでEnter押下時にも診断実行
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        //ボタンクリック処理をcall
        assessmentButton.onclick();
    }
}



const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string}  userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
    //TODO診断処理を実装する
    ///全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    ///文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    ///todo{userName}をユーザーの名前に置き換える
    result = result.replace(/\{userName\}/g, userName);

    return result;
}

console.log(assessment('太郎'));
console.log(assessment('John'));
console.log(assessment('太郎'));

//テストコード　全てのuserNameがreplaceされている事の診断
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理に不具合あり！！！！！'
);
//テストコード　入力が同じなら結果は常に同じであることを検証するコード
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力値が同じ名前なら常に診断結果は同一である処理部分に不具合！！！！！'
);
