// HTML elements

const FORM = document.querySelector('#send-mail')

const EMAIL_INPUT = document.querySelector('#email');
const SUBJECT_INPUT = document.querySelector('#subject');
const MESSAGE_INPUT = document.querySelector('#message');

const SEND_BTN = document.querySelector('#sendBtn');
const RESET_BTN = document.querySelector('#resetBtn');

const SPINNER_DIV = document.querySelector('#spinner');

registerEventListeners();


function registerEventListeners() {
    // init
    document.addEventListener('DOMContentLoaded', initApp);
    // inputs
    EMAIL_INPUT.addEventListener('blur', validateForm);
    SUBJECT_INPUT.addEventListener('blur', validateForm);
    MESSAGE_INPUT.addEventListener('blur', validateForm);
}


function initApp() {
    console.log('app iniciada...');

    SEND_BTN.disabled = true;
    SEND_BTN.classList.add('cursor-not-allowed', 'opacity-50');
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

    if( document.querySelectorAll('.border-green-500').length === 3 ) {
        // Show spinner and message
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
        console.log('aqui');
        const ERROR_P = document.querySelector('.error ');
        ERROR_P.textContent = error;
    } else {
        console.log('creado');
        const ERROR_P = document.createElement('p');
        ERROR_P.classList.add('border', 'border-red-500', 'background-red-100', 'text-center', 'mt-5', 'p3', 'error');
        ERROR_P.style.color = "red";
        
        ERROR_P.textContent = error;
        
        FORM.appendChild(ERROR_P);
    }
}
