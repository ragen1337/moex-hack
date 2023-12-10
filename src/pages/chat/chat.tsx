import React, {KeyboardEventHandler, LegacyRef, useEffect, useRef, useState} from 'react';
import {PageContent, PageHeader} from '../../shared';
import s from './chat.module.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {TMessageObject} from './chat.types.ts';
import {E_MESSAGE_TYPES} from './chat.constants.ts';
import {sendMessage} from './model/send-message.ts';
import {Skeleton} from 'primereact/skeleton';
import {isMobile} from '../../shared/utils.ts';

export const Chat: React.FC = (): React.ReactNode => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<TMessageObject[]>([]);
  const inputRef = useRef<HTMLElement>();
  const [wait, setWait] = useState<boolean>(false);

  const addMessage = (text: string, belongs: E_MESSAGE_TYPES) => {
    setMessages((messages: TMessageObject[]) => [...messages, {message: text, type: belongs, id: Date.now()}]);
  };

  const sendMessageHandler = async () => {
    if (message.length) {
      addMessage(message, E_MESSAGE_TYPES.USER);
      setMessage('');

      setWait(true);
      const responseMessage = await sendMessage(message);
      setWait(false);

      addMessage(responseMessage.text, E_MESSAGE_TYPES.CHAT);
    }
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [messages]);

  const messagesJsx = messages.map((msg: TMessageObject) => {
    let className = '';

    switch (msg.type) {
      case E_MESSAGE_TYPES.USER:
        className = s.user;
        break;
      case E_MESSAGE_TYPES.CHAT:
        className = s.bot;
        break;
    }

    return <div
      className={`${s.messageWrapper} ${className}`}
      key={msg.id}
    >
      {msg.message}
    </div>;
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!wait && event.key === 'Enter') {
      sendMessageHandler();
    }
  };

  return (
    <>
      <PageHeader>Чат</PageHeader>
      <PageContent>
        <div className={s.chatWrapper}>
          <section
            className={s.messages}
            ref={inputRef as LegacyRef<HTMLElement> | undefined}
          >
            {messagesJsx}
            {wait &&
              <Skeleton height="2rem" width={'200px'} className="mb-2"/>
            }
          </section>
          <div className={s.textWrapper}>
            <InputText
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown as unknown as KeyboardEventHandler<HTMLInputElement>}
            />
            <Button
              icon={isMobile() ? undefined : 'pi pi-send'}
              onClick={() => sendMessageHandler()}
              disabled={wait}
            >
              Отправить
            </Button>
          </div>
        </div>
      </PageContent>
    </>
  );
};
