import React, { useEffect } from 'react';

const  RasaWebchat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/rasa-webchat/lib/index.min.js';
    script.async = true;
    script.onload = () => {
      window.WebChat.default(
        {
          selector: '#webchat', // Le chat sera intégré ici
          initPayload: '/get_started',
          customData: { language: 'en' },
          socketUrl: 'http://localhost:5005',
          socketPath: '/socket.io/',
          title: 'Mint BOT',
          tooltipPayload: '/get_started',
          tooltip: true,
          tooltipDelay: 500,
          subtitle: 'Powered by Mint HR',
          connectingText: 'Waiting for server...',
          profileAvatar: '/assets/images/logo.jpg',
          openLauncherImage: 'https://your-launcher-image-url.com/launcher.jpg',
          params: { storage: 'session' },
          mainColor: '#008055',
          userBackgroundColor: '#008055',
          userTextColor: '#cde9ce',
          showMessageDate: false,
          inputTextFieldHint: 'Hi. Type your message here...',
          badge: ' ',
          displayUnreadCount: true,
          embedded: true, // Intégrer directement le chat
          showCloseButton: true,
          fullScreenMode: true,
          showFullScreenButton: true,
          docViewer: false,
        },
        null
      );
    };
    document.head.appendChild(script);

    return () => {
      const webchatDiv = document.getElementById('webchat');
      const div = document.querySelector('.chat-section');
      if (webchatDiv) {
        webchatDiv.innerHTML = '';
        div.append(webchatDiv)
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div id="webchat" className="w-full "></div>;
};

export default RasaWebchat;
