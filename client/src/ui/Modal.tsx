import React, {
  cloneElement,
  createContext,
  ReactElement,
  useContext,
  useRef,
  useState,
} from "react";
import ReactDOM, { createPortal } from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: #00000049;
  backdrop-filter: blur(12px);
`;

const Window = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5rem;
  background-color: var(--color-table-light);
  border-radius: 3px;
  border: 2px solid var(--color-table-border);
  max-height: 90vh;
  overflow-y: auto;
  max-width: 90vw;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

type Props = {
  children?: React.ReactNode;
  triggerElement: React.ReactElement<{ onClick: () => void }>;
};

type ModalValueType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalValueType>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("useModalContext used outside the Provider");
  return context;
};

export const Modal: React.FC<Props> = ({ triggerElement, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  function detectOutsideClick(e) {
    if (e.target.contains(overlay.current)) setIsOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {cloneElement(triggerElement as React.ReactElement<any>, {
        onClick: () => setIsOpen(true),
      })}
      {isOpen &&
        createPortal(
          <Overlay ref={overlay} onClick={detectOutsideClick}>
            <Window>
              <CloseBtn onClick={() => setIsOpen(false)}>
                <IoMdCloseCircle size={25} />
              </CloseBtn>
              {children}
            </Window>
          </Overlay>,
          document.body
        )}
    </ModalContext.Provider>
  );
};
