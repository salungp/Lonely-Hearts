class BootstrapPinInput {
    constructor() {
        this.inputs = document.querySelectorAll('.pin-input-field');
        this.submitBtn = document.getElementById('submitBtn');
        this.messageContainer = document.getElementById('messageContainer');
        this.messageAlert = document.getElementById('messageAlert');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.correctPin = '12345'; // Ganti dengan PIN yang diinginkan
        
        this.init();
    }
    
    init() {
        // Event listeners untuk setiap input
        this.inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => this.handleInput(e, index));
            input.addEventListener('keydown', (e) => this.handleKeydown(e, index));
            input.addEventListener('paste', (e) => this.handlePaste(e, index));
            input.addEventListener('focus', () => this.clearError());
            input.addEventListener('blur', () => this.updateInputState(input));
        });
        
        // Event listeners untuk tombol
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
    }
    
    handleInput(e, index) {
        const value = e.target.value;
        
        // Hanya terima angka
        if (!/^\d$/.test(value)) {
            e.target.value = '';
            return;
        }
        
        // Update visual state
        this.updateInputState(e.target);
        
        // Pindah ke input berikutnya
        if (value && index < this.inputs.length - 1) {
            this.inputs[index + 1].focus();
        }
        
        this.updateSubmitButton();
        this.clearError();
    }
    
    handleKeydown(e, index) {
        // Handle backspace
        if (e.key === 'Backspace') {
            if (!e.target.value && index > 0) {
                this.inputs[index - 1].focus();
                this.inputs[index - 1].value = '';
                this.updateInputState(this.inputs[index - 1]);
            }
        }
        
        // Handle arrow keys
        if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            this.inputs[index - 1].focus();
        }
        if (e.key === 'ArrowRight' && index < this.inputs.length - 1) {
            e.preventDefault();
            this.inputs[index + 1].focus();
        }
        
        // Handle Enter
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSubmit();
        }
        
        this.updateSubmitButton();
    }
    
    handlePaste(e, index) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').split('');
        
        // Isi input dengan digit yang di-paste
        digits.forEach((digit, i) => {
            if (index + i < this.inputs.length) {
                this.inputs[index + i].value = digit;
                this.updateInputState(this.inputs[index + i]);
            }
        });
        
        // Focus pada input berikutnya atau input terakhir
        const nextEmptyIndex = Math.min(index + digits.length, this.inputs.length - 1);
        this.inputs[nextEmptyIndex].focus();
        
        this.updateSubmitButton();
        this.clearError();
    }
    
    updateInputState(input) {
        // Update visual state berdasarkan isi input
        if (input.value) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    }
    
    updateSubmitButton() {
        const allFilled = Array.from(this.inputs).every(input => input.value !== '');
        this.submitBtn.disabled = !allFilled;
    }
    
    async handleSubmit() {
        const pin = Array.from(this.inputs).map(input => input.value).join('');
        
        if (pin.length !== this.inputs.length) {
            this.showMessage('Silakan lengkapi semua digit PIN', 'danger');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        // Simulasi delay untuk demo (hapus ini di production)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (pin === this.correctPin) {
            this.showMessage('✅ Box found success redirected...', 'success');
            
            // Redirect ke detail.html setelah 1.5 detik
            setTimeout(() => {
                window.location.href = 'ad-detail.html';
            }, 1500);
        } else {
            this.showMessage('❌ The PO number is incorrect.', 'danger');
            this.showError();
        }
        
        this.setLoadingState(false);
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.loadingSpinner.classList.remove('d-none');
            this.submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Verifying...';
        } else {
            this.updateSubmitButton();
            this.loadingSpinner.classList.add('d-none');
            this.submitBtn.innerHTML = 'View Message';
        }
    }
    
    showError() {
        this.inputs.forEach(input => {
            input.classList.add('error');
            setTimeout(() => {
                input.classList.remove('error');
            }, 500);
        });
    }
    
    clearError() {
        this.inputs.forEach(input => input.classList.remove('error'));
    }
    
    showMessage(text, type) {
        this.messageAlert.className = `alert alert-${type} mb-0`;
        this.messageAlert.innerHTML = text;
        this.messageContainer.classList.add('show');
        
        // Auto hide setelah 4 detik kecuali error
        if (type !== 'danger') {
            setTimeout(() => {
                this.messageContainer.classList.remove('show');
            }, 4000);
        }
    }
    
    clearAll() {
        this.inputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled', 'error');
        });
        this.inputs[0].focus();
        this.updateSubmitButton();
        this.messageContainer.classList.remove('show');
    }
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }

  function updateDate() {
    const now = new Date();

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const formatted = `${dayName} ${date}${getOrdinal(date)} ${month} ${year}`;
    document.getElementById("current-date").textContent = formatted;
  }

  // Initial run
  updateDate();

  // Optional: update every second (real-time)
  setInterval(updateDate, 1000);


// Navbar dropdown toggle menu
const hamburger = document.getElementById('lhHamburger');
const menu = document.getElementById('lhMobileMenu');

// Toggle menu
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent it from triggering the document click
    menu.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('active');
    }
});

// Textarea number character info
function updateLHtextarea() {
    const textarea = document.getElementById('lh-textarea');
    const counter = document.getElementById('lh-textarea-info');
    counter.textContent = textarea.value.length;
}

// Toggle dropdown
document.querySelectorAll('.lh-dropdown-button').forEach((btn) => {
    btn.addEventListener('click', function (e) {
        const wrap = this.parentElement;
        document.querySelectorAll('.lh-dropdown-wrap').forEach((el) => {
        if (el !== wrap) el.classList.remove('open');
        });
        wrap.classList.toggle('open');
    });
});

// Select option
document.querySelectorAll('.lh-option').forEach((option) => {
    option.addEventListener('click', function () {
        const wrap = this.closest('.lh-dropdown-wrap');
        const btn = wrap.querySelector('.lh-dropdown-button');
        btn.textContent = this.textContent;
        wrap.classList.remove('open');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.lh-dropdown-wrap')) {
        document.querySelectorAll('.lh-dropdown-wrap').forEach((el) => {
        el.classList.remove('open');
        });
    }
});