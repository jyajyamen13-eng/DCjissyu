// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
    // 年齢計算のリスナー設定
    const birthDateInput = document.getElementById('birthDate');
    if (birthDateInput) {
        birthDateInput.addEventListener('change', calculateAge);
    }

    // 在籍月数計算のリスナー設定
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        startDateInput.addEventListener('change', calculateMonths);
    }

    // 自動保存設定を確認
    const autoLoad = localStorage.getItem('autoLoad');
    if (autoLoad === 'true') {
        loadData(true);
    }

    // アップロードされたファイルがあれば通知表示
    const uploadedFile = localStorage.getItem('uploadedFileName');
    if (uploadedFile) {
        showUploadNotification(uploadedFile);
        localStorage.removeItem('uploadedFileName');
    }

    // URLパラメータで自動読み込みフラグがあれば読み込み
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autoload') === 'true') {
        loadData(true);
    }
});

// アップロード通知を表示
function showUploadNotification(fileName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease;
    `;
    notification.innerHTML = `
        <strong>✅ 読み込み完了</strong><br>
        ${fileName} から自動入力されました
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// 年齢を計算する関数
function calculateAge() {
    const birthDateInput = document.getElementById('birthDate');
    const ageInput = document.getElementById('age');
    
    if (!birthDateInput || !ageInput) return;
    
    const birthDate = new Date(birthDateInput.value);
    if (isNaN(birthDate)) {
        ageInput.value = '';
        return;
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    ageInput.value = age + '歳';
}

// 在籍月数を計算する関数
function calculateMonths() {
    const startDateInput = document.getElementById('startDate');
    const monthsInput = document.getElementById('months');
    
    if (!startDateInput || !monthsInput) return;
    
    const startDate = new Date(startDateInput.value);
    if (isNaN(startDate)) {
        monthsInput.value = '';
        return;
    }
    
    const today = new Date();
    let months = (today.getFullYear() - startDate.getFullYear()) * 12;
    months += today.getMonth() - startDate.getMonth();
    
    if (months < 0) months = 0;
    
    monthsInput.value = months + 'ヶ月';
}

// PDF出力関数
function printForm() {
    window.print();
}

// データ保存関数
function saveData() {
    const form = document.getElementById('internshipForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {};
    
    // テキスト入力フィールドの保存
    for (let [key, value] of formData.entries()) {
        if (!data[key]) {
            data[key] = value;
        }
    }
    
    // チェックボックスの保存
    const disabilities = [];
    document.querySelectorAll('input[name="disability"]:checked').forEach(cb => {
        disabilities.push(cb.value);
    });
    data.disabilities = disabilities;
    
    const certificates = [];
    document.querySelectorAll('input[name="certificate"]:checked').forEach(cb => {
        certificates.push(cb.value);
    });
    data.certificates = certificates;
    
    // ラジオボタンの保存
    const genderRadio = document.querySelector('input[name="gender"]:checked');
    if (genderRadio) {
        data.gender = genderRadio.value;
    }
    
    // ローカルストレージに保存
    localStorage.setItem('formData', JSON.stringify(data));
    
    // 保存完了メッセージ
    showNotification('💾 データを保存しました', 'success');
}

// データ読み込み関数
function loadData(silent = false) {
    const savedData = localStorage.getItem('formData');
    
    if (!savedData) {
        if (!silent) {
            showNotification('⚠️ 保存されたデータがありません', 'warning');
        }
        return;
    }
    
    try {
        const data = JSON.parse(savedData);
        const form = document.getElementById('internshipForm');
        if (!form) return;
        
        // テキスト入力フィールドの復元
        for (let [key, value] of Object.entries(data)) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input && input.type !== 'checkbox' && input.type !== 'radio') {
                input.value = value;
            }
        }
        
        // チェックボックスの復元
        if (data.disabilities) {
            data.disabilities.forEach(value => {
                const checkbox = form.querySelector(`input[name="disability"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        if (data.certificates) {
            data.certificates.forEach(value => {
                const checkbox = form.querySelector(`input[name="certificate"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        // ラジオボタンの復元
        if (data.gender) {
            const radio = form.querySelector(`input[name="gender"][value="${data.gender}"]`);
            if (radio) radio.checked = true;
        }
        
        // 年齢と在籍月数を再計算
        calculateAge();
        calculateMonths();
        
        if (!silent) {
            showNotification('📂 データを読み込みました', 'success');
        }
        
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        if (!silent) {
            showNotification('❌ データの読み込みに失敗しました', 'error');
        }
    }
}

// フォームクリア関数
function clearForm() {
    if (!confirm('すべての入力内容をクリアしますか？')) {
        return;
    }
    
    const form = document.getElementById('internshipForm');
    if (form) {
        form.reset();
        showNotification('🗑️ フォームをクリアしました', 'success');
    }
}

// 通知表示関数
function showNotification(message, type = 'success') {
    const colors = {
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#f44336',
        info: '#2196F3'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease;
        max-width: 400px;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ファイルから読み込み（将来の拡張用）
function loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                localStorage.setItem('formData', JSON.stringify(data));
                loadData();
            } catch (error) {
                showNotification('❌ ファイルの読み込みに失敗しました', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}
