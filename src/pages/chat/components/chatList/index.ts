import СhatList from './chatList';
import insertInDOM from '../../../../utils/insertInDOM';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import { initChatPreview } from '../chatPreview/index';
import { chatController } from '../../../../controllers/chats';
import noImgAvatar from '../../../../../static/img/no_img_circle.svg';
import { globalStoreEventBus } from '../../../../store/globalStore';

export function initChatList(parentElSelector:string): СhatList {
  const data = {
    createBtn: {
      wrapperClass: 'chat-list__create-btn',
      events: {
        click: (event: Event) => toggleCreateChat(event),
      },
      open: false,
    },
    sendTitleBtn: {
      wrapperClass: 'chat-list__send-btn',
      events: {
        click: (event: Event) => requestCreateChat(event),
      },
    },
    chatTitleInput: {
      wrapperClass: 'chat-list__chat-title-input',
    },
    // chats: chatController.getDataForChats(),
    chats: [
      {
        title: 'Илья',
        last_message: 'В траве сидел кузнечик ...',
        time: '12:15',
        avatar: `${noImgAvatar}`,
      },
      {
        title: 'Олег',
        last_message: 'Представьте себе, представьте себе Совсем как огуречик...',
        time: 'Пн',
        avatar: `${noImgAvatar}`,
      },
    ],
  };

  const chatList = new СhatList({});
  insertInDOM(parentElSelector, chatList);

  const createBtn = new Button(data.createBtn);
  insertInDOM('.chat-list__create-chat-box', createBtn);

  const chatTitleInput = new Input(data.chatTitleInput);
  chatTitleInput.element.setAttribute('placeholder', 'введите название чата');
  chatTitleInput.hide();
  insertInDOM('.chat-list__create-chat-box', chatTitleInput);

  const sendTitleBtn = new Button(data.sendTitleBtn);
  sendTitleBtn.hide();
  insertInDOM('.chat-list__create-chat-box', sendTitleBtn);

  // создаем сhatPreview
  chatList.renderChatPrewiews = function(chats) {
    console.log('chatList.renderChatPrewiews', chats[0]);
    for (let i = 0; i < chats.length; i += 1) {
      const сhatPreview = initChatPreview(chats[i]);
      const сhatPreviewLi = document.createElement('li');
      сhatPreviewLi.appendChild(document.createElement('hr'));
      сhatPreviewLi.appendChild(сhatPreview.getWrapperElement());
      const previewList = document.querySelector('.chat-list__preview-list');
      if (previewList) {
        previewList.appendChild(сhatPreviewLi);
      }
    }
  };

  chatList.renderChatPrewiews(data.chats);

  globalStoreEventBus.on('flow:something-has-changed', doChangeChatPrewiews);

  function doChangeChatPrewiews(...args) {
    console.log('---doChangeChatPrewiews', args);
    if (args[0] === 'chats') {
      const newChats = chatController.getDataForChats();
      const previewList = document.querySelector('.chat-list__preview-list');
      if (previewList) {
        previewList.textContent = '';
      }
      console.log('newChats', newChats);
      chatList.renderChatPrewiews(newChats);
    }
  }

  function toggleCreateChat(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if (createBtn.props.open) {
      createBtn.element.classList.remove('cancel');
      chatTitleInput.hide();
      sendTitleBtn.hide();
      createBtn.props.open = false;
    } else {
      createBtn.element.classList.add('cancel');
      chatTitleInput.show();
      sendTitleBtn.show();
      createBtn.props.open = true;
    }
  }

  function requestCreateChat(event: Event) {
    console.log('---requestCreateChat');
    event.preventDefault();
    const chatTitle = chatTitleInput.element.value;
    console.log('--chatTitle', chatTitle);
    chatController.create(chatTitle);
    chatTitleInput.element.value = '';
    toggleCreateChat();
  }

  return chatList;
}
