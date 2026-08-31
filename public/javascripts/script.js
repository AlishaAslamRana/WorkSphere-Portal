// Modal Display Function
function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id){
    document.getElementById(id).classList.remove('active');
}
function switchModal(closeId, openId){
    closeModal(closeId);
    openModal(openId);
}
function validateLogIn(event) {
    return true;
}

// ===== Real time Password check =====
function checkPassword(){
    const password = document.getElementById('signupPass').value;
    const error = document.getElementById('passwordError');
    error.textContent = ""; 

    if(password === "") return;

    let errorMsg = "";
    if(!/^[a-zA-Z]/.test(password)){ 
        errorMsg = "Password must start with an Alphabet letter";
    }
    else if(password.length > 8){ 
        errorMsg = "Password maximum length should be 8 characters";
    }
    else if(!/[0-9]/.test(password)){ 
        errorMsg = "Password must contain at least 1 number.";
    }
    else if(!/[!@#$%^&*"_(),:?.<>|{}]/.test(password)){ 
        errorMsg = "Password must contain at least 1 special character";
    }

    error.textContent = errorMsg;
}

// ===== Real time Confirm Password check =====
function checkConfirmPass(){
    const password = document.getElementById('signupPass').value;
    const confirmPass = document.getElementById('confirmPass').value;
    const error = document.getElementById('confirmPassError');
    error.textContent = "";

    if(confirmPass === "") return;

    if(password !== confirmPass){
        error.textContent = "Passwords do not match!";
    }
}

// ===== Submit pe final validation =====
function validateSignUp(event) {
    document.querySelectorAll('#signupModal .error-msg').forEach(el => el.textContent = '');

    const password = document.getElementById('signupPass').value;
    const confirmPass = document.getElementById('confirmPass').value;

    const startsWithLetter = /^[a-zA-Z]/.test(password);
    const maxLength = password.length <= 8;
    const specialChar = /[!@#$%^&*"_(),:?.<>|{}]/.test(password);
    const Number = /[0-9]/.test(password);

    let isValid = true;
    if(password !== confirmPass){
        document.getElementById('confirmPassError').textContent = "Passwords do not match!";
        isValid = false;
    }
    if(!startsWithLetter){
        document.getElementById('passwordError').textContent = "Password must start with an Alphabet letter";
        isValid = false;
    }else if(!maxLength){
        document.getElementById('passwordError').textContent = "Password maximum length should be 8 characters";
        isValid = false;
    }else if(!Number){
        document.getElementById('passwordError').textContent = "Password must contain at least 1 number.";
        isValid = false;
    }else if(!specialChar){
        document.getElementById('passwordError').textContent = "Password must contain at least 1 special character";
        isValid = false;
    }
    
    if (!isValid) {
        event.preventDefault(); 
    }
    return isValid;
}