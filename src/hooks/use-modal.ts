"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { ModalSize } from "rizzui";

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  size?: ModalSize;
  outSideClickClose?: boolean;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: "320px",
  size: "sm",
  outSideClickClose: false,
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    size,
    outSideClickClose = false,
  }: {
    view: React.ReactNode;
    customSize?: string;
    size?: ModalSize;
    outSideClickClose?: boolean;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
      size,
      outSideClickClose,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  // set view to null when modal is closed
  useEffect(() => {
    if (!state.isOpen) {
      setState({
        ...state,
        view: null,
      });
    }
  }, [state.isOpen]);

  return {
    ...state,
    openModal,
    closeModal,
  };
}
