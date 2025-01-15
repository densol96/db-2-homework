import React, { cloneElement, ReactElement, useRef, useState } from "react";
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
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

type Props = {
  children?: React.ReactNode;
  triggerElement?: React.ReactElement<{ onClick: () => void }>;
};

export const Modal: React.FC<Props> = ({ triggerElement, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  function detectOutsideClick(e) {
    if (e.target.contains(overlay.current)) setIsOpen(false);
  }

  return (
    <>
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
    </>
  );
};
