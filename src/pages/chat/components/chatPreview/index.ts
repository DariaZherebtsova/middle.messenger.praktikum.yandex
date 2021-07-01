import ChatPreview from './chatPreview';

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
    console.log('---selectChat', chatPreview);
  }
  return chatPreview;
}
