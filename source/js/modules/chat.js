import {GET_SUCCESS_MESSAGE, SCREEN_NAMES} from '../constants';

const RESULT_TRIP_MESSAGE = `Это Антарктида?`;
const RESULT_SUITCASE_MESSAGE = `Антарктида?`;

const emitChangeDisplayEvent = (screenEl) => {
  const event = new CustomEvent(GET_SUCCESS_MESSAGE, {
    detail: {
      'screenElement': screenEl
    }
  });

  document.body.dispatchEvent(event);
};

export default () => {
  let winScreen = null;
  let message = ``;
  let messageForm = document.getElementById(`message-form`);
  let messageField = document.getElementById(`message-field`);
  let messageList = document.getElementById(`messages`);
  let chatBlock = document.querySelector(`.js-chat`);

  messageForm.addEventListener(`submit`, function (e) {
    e.preventDefault();

    const checkWinScreen = () => {
      if (winScreen) {
        emitChangeDisplayEvent(winScreen);
      }
    };

    let scrollToBottom = function () {
      if (messageList.scrollHeight > chatBlock.offsetHeight) {
        chatBlock.scrollTop = messageList.scrollHeight;
      }
    };

    let getAnswer = function () {
      setTimeout(function () {
        let answerEl = document.createElement(`li`);
        let placeholder = document.createElement(`div`);
        let textEl = document.createElement(`p`);
        placeholder.classList.add(`chat__placeholder`);
        for (let i = 0; i < 3; i++) {
          let dot = document.createElement(`span`);
          placeholder.appendChild(dot);
        }
        answerEl.appendChild(placeholder);
        answerEl.classList.add(`chat__message`);
        answerEl.classList.add(`chat__message--incoming`);
        answerEl.classList.add(`chat__message--last`);
        let answer = Math.floor(Math.random() * 2);
        let answerText;

        if (answer) {
          answerText = `Да`;
        } else {
          answerText = `Нет`;
        }

        if (message === RESULT_TRIP_MESSAGE.toLowerCase()) {
          winScreen = SCREEN_NAMES.RESULT_TRIP;
          answerText = `Да`;
        }

        if (message === RESULT_SUITCASE_MESSAGE.toLowerCase()) {
          winScreen = SCREEN_NAMES.RESULT_SUITCASE;
          answerText = `Да`;
        }

        textEl.innerText = answerText;
        textEl.classList.add(`hidden`);
        answerEl.appendChild(textEl);
        messageList.appendChild(answerEl);
        scrollToBottom();

        setTimeout(function () {
          checkWinScreen();
          let lastMessage = document.querySelector(`.chat__message--last`);
          if (lastMessage) {
            let lastMessagePlaceholder = lastMessage.querySelector(`.chat__placeholder`);
            let lastMessageText = lastMessage.querySelector(`p`);
            lastMessagePlaceholder.classList.add(`chat__placeholder--hidden`);
            setTimeout(function () {
              lastMessagePlaceholder.remove();
            }, 400);
            lastMessageText.classList.remove(`hidden`);
            lastMessage.classList.remove(`chat__message--last`);
          }
        }, 700);
      }, 700);
    };

    let postQuestion = function () {
      if (messageField.value) {
        message = messageField.value.toLowerCase();
        let messageEl = document.createElement(`li`);
        messageEl.classList.add(`chat__message`);
        let messageText = messageField.value;
        let text = document.createElement(`p`);
        text.innerText = messageText;
        messageEl.appendChild(text);
        messageEl.classList.add(`chat__message--outcoming`);
        messageList.appendChild(messageEl);
        messageField.value = ``;
        messageField.setAttribute(`disabled`, `true`);
        scrollToBottom();

        getAnswer();

        messageField.removeAttribute(`disabled`);
        messageField.focus();
      }
    };

    postQuestion();

  });
};
