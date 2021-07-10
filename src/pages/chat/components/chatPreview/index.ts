import ChatPreview from './chatPreview';
import { chatController } from '../../../../controllers/chats';

export function initChatPreview(props: Record<string, any>): ChatPreview {
  const data = {
    ...props,
    events: {
      click: (event: Event) => selectChat(event),
    },
  };
  const chatPreview = new ChatPreview(data);

  function selectChat(event: Event) {
    event.preventDefault();
    chatController.setCurrentChat(chatPreview.chatInfo);
  }
  return chatPreview;
}
