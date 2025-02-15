/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Dispatch, SetStateAction } from "react";

export interface mainContextType {
    isOpenMenu: boolean,
    setIsOpenMenu: Dispatch<SetStateAction<boolean>>,
    fullView: boolean,
    setFullView: Dispatch<SetStateAction<boolean>>,
    currentDoc: number, 
    setCurrentDoc: Dispatch<SetStateAction<number>>,
    data: any[],
}

export const MainContext = React.createContext<mainContextType | undefined>(undefined)