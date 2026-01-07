// OpenWeather API 設定
const apiKey = '5520c4cbdd8759fd83c8cf2f3f49eb89'; 
const city = 'Tokyo';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

async function updateWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherMain = data.weather[0].main; 
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        
        // 表示の更新
        const weatherDisplay = document.getElementById('weather-display');
        weatherDisplay.innerHTML = `<p>現在の赤羽台: <strong>${description}</strong> / 気温: <strong>${temp}℃</strong></p>`;

        // 天候に応じたデザインとメッセージの変更
        const body = document.body;
        const greeting = document.getElementById('greeting');
        const suggestion = document.getElementById('weather-suggestion');

        // 時間帯の判定
        const hour = new Date().getHours();
        const isNight = hour >= 18 || hour < 6;

        if (isNight) {
            body.className = 'weather-night';
            greeting.innerText = "夜のINIADへようこそ！";
            suggestion.innerText = "夜は静かで集中しやすい時間です。wellbe図書館での勉強がおすすめです。";
        } else if (weatherMain === 'Clear') {
            body.className = 'weather-sunny';
            greeting.innerText = "今日は晴れています！";
            suggestion.innerText = "天気が良いので、テラス席で課題をこなすのがおすすめです。";
        } else if (weatherMain === 'Rain' || weatherMain === 'Drizzle' || weatherMain === 'Thunderstorm') {
            body.className = 'weather-rainy';
            greeting.innerText = "今日は雨ですね。";
            suggestion.innerText = "雨の日はキャンパス内の快適なメディアセンターで過ごしましょう。";
        } else {
            body.className = 'weather-default';
            greeting.innerText = "INIADへようこそ！";
            suggestion.innerText = "最新の設備で、自分の可能性を広げよう。";
        }

    } catch (error) {
        console.error('天気データの取得に失敗しました:', error);
        document.getElementById('greeting').innerText = "INIADへようこそ";
    }
}

updateWeather();