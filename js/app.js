// HTML elements

const FORM = document.querySelector('#send-mail')

const EMAIL_INPUT = document.querySelector('#email');
const SUBJECT_INPUT = document.querySelector('#subject');
const MESSAGE_INPUT = document.querySelector('#message');

const SEND_BTN = document.querySelector('#sendBtn');
const RESET_BTN = document.querySelector('#resetBtn');

registerEventListeners();


function registerEventListeners() {
    // INIT
    document.addEventListener('DOMContentLoaded', initApp);

    // INPUT
    EMAIL_INPUT.addEventListener('blur', validateForm);
    SUBJECT_INPUT.addEventListener('blur', validateForm);
    MESSAGE_INPUT.addEventListener('blur', validateForm);

    // BTN
    FORM.addEventListener('submit', sendForm);
    RESET_BTN.addEventListener('click', resetForm);
}


function initApp() {
    console.log('app started...');

    SEND_BTN.disabled = true;
    SEND_BTN.classList.add('cursor-not-allowed', 'opacity-50');
}

function resetForm(e) {
    FORM.reset();
    e.preventDefault();

    if( document.querySelector('.error') ) {
        document.querySelector('.error').remove();
    }

    EMAIL_INPUT.classList.remove('border-red-500', 'border-green-500');
    SUBJECT_INPUT.classList.remove('border-red-500', 'border-green-500');
    MESSAGE_INPUT.classList.remove('border-red-500', 'border-green-500');
}

function sendForm(e) {
    e.preventDefault();

    const SPINNER_DIV = document.querySelector('#spinner');
    SPINNER_DIV.style.display = 'flex';

    // Display message after three secs
    setTimeout(() => {
        SPINNER_DIV.style.display = 'none';

        const SUCCES_P = document.createElement('p');
    
        SUCCES_P.classList.add('uppercase', 'text-center', 'text-white', 'my-10', 'mb-5', 'font-bold', 'bg-green-500');
        SUCCES_P.textContent = 'Your email has been sent!';

        FORM.insertBefore(SUCCES_P, document.querySelector('.justify-between') );

        // Delete message after three secs and reset the form
        setTimeout(() => {
           SUCCES_P.remove(); 
           resetForm();
           initApp();
        }, 5000);
    }, 3000);
}

function validateForm(e) {
    const CONTENT = e.target.value;

    if( e.target.value.length > 0 ) {

        if( e.target.type === 'email') {
            checkEmail( CONTENT, e);
        } else if( e.target.type === 'text') {
            checkContent( CONTENT, e);
        } else if ( e.target.type === 'textarea'){
            checkContent( CONTENT, e);
        }

    } else {
        e.target.classList.add('border', 'border-red-500');
        showError(e);
    }

    // Success
    if( document.querySelectorAll('.border-green-500').length === 3 ) {
        // Remove error element 
        if( document.querySelector('.error') ) {
            document.querySelector('.error').remove();
        }

        // Activate SEND btn
        SEND_BTN.disabled = false;
        SEND_BTN.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function checkEmail(content, event) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if( regExp.test( content ) ) {
        event.target.classList.add('border', 'border-green-500');
    } else {
        event.target.classList.remove('border', 'border-green-500');
        event.target.classList.add('border', 'border-red-500');
        showError( undefined, 'Invalid email.');
    }
}

function checkContent(content, event) {
    if( content.length >= 10 ) {
        event.target.classList.add('border', 'border-green-500');
    } else {
        event.target.classList.remove('border', 'border-green-500');
        event.target.classList.add('border', 'border-red-500');
        const ERROR_MESSAGE = `The ${ event.target.type } must contain at least 10 chars.`
        showError( undefined, ERROR_MESSAGE);
    }
}

function showError(e, mssg ) {

    let error = mssg;

    if( !mssg ) {
        if( e.target.id === 'email') {
            error = 'The mail can not be blank.';
        } else if ( e.target.id === 'subject' ) {
            error = 'The subject can not be blank.'; 
        } else if ( e.target.id === 'message' ) {
            error = 'The message can not be blank.';
        }
    }

    if( document.querySelector('.error ') ) {
        const ERROR_P = document.querySelector('.error ');
        ERROR_P.textContent = error;
    } else {
        const ERROR_P = document.createElement('p');
        ERROR_P.classList.add('border', 'border-red-500', 'background-red-100', 'text-center', 'mt-5', 'p3', 'error');
        ERROR_P.style.color = "red";
        
        ERROR_P.textContent = error;
        
        FORM.appendChild(ERROR_P);
    }
}
