import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';

const Dim = styled.div.attrs(() => {
  return {
    className: 'modal-backdrop fade show',
  };
})``;

const Container = styled.div.attrs(() => {
  return {
    className: 'modal',
  };
})`
  display: block;
`;

const Content = styled.div.attrs(() => {
  return {
    className: 'modal-dialog modal-content',
  };
})``;

const Header = styled.div.attrs(() => {
  return {
    className: 'modal-header',
  };
})``;

const HeaderTitle = styled.h5.attrs(() => {
  return {
    className: 'modal-title',
  };
})``;

const Body = styled.div.attrs(() => {
  return {
    className: 'modal-body',
  };
})``;

const Footer = styled.div.attrs(() => {
  return {
    className: 'modal-footer',
  };
})``;

const CloseButton = styled(Button).attrs(() => {
  return {
    className: 'btn-close',
  };
})``;

const DoneButton = styled(Button).attrs(() => {
  return {
    className: 'btn btn-primary',
  };
})``;

export interface ModalProps {
  modalTitle: string | React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  onDone?: () => void;
}

const Modal = ({ modalTitle, children, onClose, onDone }: ModalProps) => {
  return (
    <>
      <Container>
        <Content>
          <Header>
            <HeaderTitle>{modalTitle}</HeaderTitle>
            <CloseButton
              onClick={() => {
                if (!onClose) return;
                onClose();
              }}
            />
          </Header>
          <Body>{children}</Body>
          <Footer>
            <DoneButton
              onClick={() => {
                if (!onDone) return;
                onDone();
              }}>
              저장
            </DoneButton>
          </Footer>
        </Content>
      </Container>
      <Dim />
    </>
  );
};

export default Modal;
