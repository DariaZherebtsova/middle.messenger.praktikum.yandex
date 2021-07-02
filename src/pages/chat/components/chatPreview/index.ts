import ChatPreview from './chatPreview';
import { chatController } from '../../../../controllers/chats';

export function initChatPreview(props): ChatPreview {
  const data = {
    ...props,
    events: {
      click: (event: Event) => selectChat(event),
    },
  };
  const chatPreview = new ChatPreview(data);

  function selectChat(event) {
    event.preventDefault();
    console.log('---selectChat', chatPreview.chatInfo);
    chatController.setCurrentChat(chatPreview.chatInfo);
  }
  return chatPreview;
}
