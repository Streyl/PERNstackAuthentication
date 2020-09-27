import * as PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
export { elementType };
export declare const numberFormat: PropTypes.Validator<unknown>;
export declare const dateFormat: PropTypes.Validator<unknown>;
export declare let disabled: PropTypes.Validator<boolean> & {
    acceptsArray: PropTypes.Validator<any>;
};
export declare const accessor: PropTypes.Requireable<string | ((...args: any[]) => any)>;
export declare const message: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
//# sourceMappingURL=PropTypes.d.ts.map