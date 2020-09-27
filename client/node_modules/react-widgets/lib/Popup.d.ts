import React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
export interface PopupProps extends TransitionProps {
    className?: string;
    open?: boolean;
    dropUp?: boolean;
    onEntering?: () => void;
    onEntered?: () => void;
    transition?: React.ComponentType<TransitionProps>;
    role?: string;
    id?: string;
    children: React.ReactNode;
}
declare const Popup: React.ForwardRefExoticComponent<Pick<PopupProps, React.ReactText> & React.RefAttributes<HTMLDivElement>>;
export default Popup;
//# sourceMappingURL=Popup.d.ts.map