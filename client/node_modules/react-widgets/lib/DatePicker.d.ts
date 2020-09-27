import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePickerProps } from './DateTimePicker';
interface DatePickerProps extends DateTimePickerProps {
    open?: boolean;
    defaultOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
}
declare class DatePicker extends React.Component<DatePickerProps> {
    static propTypes: {
        open: PropTypes.Requireable<boolean>;
        defaultOpen: PropTypes.Requireable<boolean>;
        onToggle: PropTypes.Requireable<(...args: any[]) => any>;
    };
    toggleState: boolean | undefined;
    constructor(props: DatePickerProps, context: any);
    handleToggle: (open: boolean) => void;
    render(): JSX.Element;
}
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map