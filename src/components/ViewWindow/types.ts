import { ReactNode } from "react";

export type ViewProps = {
    label: string; 
}

export type ViewTabProps = {
    id: string;
    containerId: string;  
    order: number; 
    label: string;
    active: boolean; 
    startIcon?: ReactNode
    endIcon?: ReactNode;  
    onOpen?: ReactNode; 
    onClose?: (view: ViewTabProps) => void; 
}