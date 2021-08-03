import ChatPreview from './chatPreview';
import { chatController } from '../../../../controllers/chats';
import { ChatsResponse } from '../../../../controllers/types';

export function initChatPreview(props: Record<string, unknown>): ChatPreview {
  const data = {
    ...props,
    events: {
      click: (event: Event) => selectChat(event),
    },
  };
  const chatPreview = new ChatPreview(data);

  function selectChat(event: Event) {
    event.preventDefault();
    chatController.setCurrentChat(<ChatsResponse>chatPreview.chatInfo);
  }
  return chatPreview;
}
