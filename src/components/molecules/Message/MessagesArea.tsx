import { FiAlertCircle } from 'react-icons/fi';
import { ICON_DEFAULT_SIZE } from '../../../common/constants/code';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import MessageStateContext from './contexts/MessageStateContext';

const MessagesArea = () => {
  const showedMessages = useContext(MessageStateContext);

  return (
    <Container>
      <>
        {showedMessages.map((message) => {
          return (
            <Message
              type={message.type}
              message={message.message}
            />
          );
        })}
      </>
    </Container>
  );
};

export default MessagesArea;

const Container = styled.div`
  position: fixed;
  width: 300px;
  height: 100vh;
  right: 0px;
  z-index: 9999;
  padding: 10px 10px 0 10px;

  @-webkit-keyframes messageSlideFromTop {
    0% {
      opacity: 0;
      translate: 0 calc(-100% - 24px);
    }
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }
  @keyframes messageSlideFromTop {
    0% {
      opacity: 0;
      translate: 0 calc(-100% - 24px);
    }
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }
  @-webkit-keyframes messageSlideFromBottom {
    0% {
      opacity: 0;
      translate: 0 calc(100% + 24px);
    }
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }
  @keyframes messageSlideFromBottom {
    0% {
      opacity: 0;
      translate: 0 calc(100% + 24px);
    }
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }
  @-webkit-keyframes messageFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes messageFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @-webkit-keyframes progressBar {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
  @keyframes progressBar {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
  /* Core ================= */

  .message {
    font-family: 'Titillium Web', system-ui, helvetica, sans-serif;
    font-size: 14px;
    line-height: 1;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    width: 100%;
    margin-top: 10px;
    -webkit-animation: messageSlideFromTop 0.6s ease-out forwards;
    animation: messageSlideFromTop 0.2s ease-out forwards;
  }

  .message .message-progress {
    display: none;
  }

  .message.message-auto-close {
    padding: 12px 16px 15px;
  }

  .message.message-auto-close .message-progress {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 50px;
    transform-origin: left;
    z-index: -1;
  }

  .message.message-error {
    background-color: hsl(0, 68%, 90%);
    color: #d32f2f;
    border-color: #d32f2f;
  }

  .message.message-error.message-auto-close .message-progress {
    background-color: rgba(211, 47, 47, 0.45);
  }

  .message.message-success {
    background-color: hsl(120, 54%, 90%);
    color: #388e3c;
    border-color: #388e3c;
  }

  .message.message-success.message-auto-close .message-progress {
    background-color: rgba(56, 142, 60, 0.45);
  }

  .message.message-info {
    background-color: hsl(224, 54%, 90%);
    color: #385bbb;
    border-color: #385bbb;
  }

  .message.message-info.message-auto-close .message-progress {
    background-color: rgba(56, 91, 187, 0.45);
  }

  .message.message-warning {
    background-color: hsl(35, 91%, 90%);
    color: #f3950d;
    border-color: #f3950d;
  }

  .message.message-warning.message-auto-close .message-progress {
    background-color: rgba(243, 149, 13, 0.45);
  }

  .message .message-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .message .message-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .message .message-content .message-title {
    font-weight: 700;
    font-size: 16px;
  }

  .message .message-content .message-message {
    font-weight: normal;
    line-height: 1.1;
    font-size: 13px;
  }

  .message-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
  }
`;

const MESSAGE_ROOT_CLASSNAME = 'message';

export enum MessageTypes {
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}

const WARNING_COLOR = '#f3950d';
const SUCCESS_COLOR = '#388e3c';
const ERROR_COLOR = '#d32f2f';
const INFO_COLOR = '#385bbb';

const WARNING_MESSAGE_TITLE = 'Warning';
const SUCCESS_MESSAGE_TITLE = 'Success';
const ERROR_MESSAGE_TITLE = 'Error';
const INFO_MESSAGE_TITLE = 'Info';

const StyledMessageContainer = styled.div.attrs((attrs) => {
  return {
    ...attrs,
  };
})`
  display: flex;
`;

const Message = ({ type, message }: { type: MessageTypes; message: string }) => {
  const typeClassName = useMemo(() => {
    if (type === MessageTypes.WARNING) return classNames(MESSAGE_ROOT_CLASSNAME, `message-${MessageTypes.WARNING}`);
    if (type === MessageTypes.SUCCESS) return classNames(MESSAGE_ROOT_CLASSNAME, `message-${MessageTypes.SUCCESS}`);
    if (type === MessageTypes.ERROR) return classNames(MESSAGE_ROOT_CLASSNAME, `message-${MessageTypes.ERROR}`);
    return classNames(MESSAGE_ROOT_CLASSNAME, `message-${MessageTypes.INFO}`);
  }, [type]);

  const typeColor = useMemo(() => {
    if (type === MessageTypes.WARNING) return WARNING_COLOR;
    if (type === MessageTypes.SUCCESS) return SUCCESS_COLOR;
    if (type === MessageTypes.ERROR) return ERROR_COLOR;
    return INFO_COLOR;
  }, [type]);

  const typeTitle = useMemo(() => {
    if (type === MessageTypes.WARNING) return WARNING_MESSAGE_TITLE;
    if (type === MessageTypes.SUCCESS) return SUCCESS_MESSAGE_TITLE;
    if (type === MessageTypes.ERROR) return ERROR_MESSAGE_TITLE;
    return INFO_MESSAGE_TITLE;
  }, [type]);

  return (
    <StyledMessageContainer className={typeClassName}>
      <div className='message-icon'>
        <FiAlertCircle
          color={typeColor}
          size={ICON_DEFAULT_SIZE}
        />
      </div>
      <div className='message-content'>
        <div className='message-title'>{typeTitle}</div>
        <div className='message-message'>{message}</div>
      </div>
    </StyledMessageContainer>
  );
};
