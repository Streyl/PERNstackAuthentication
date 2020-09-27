import { DataItem, Value } from './types';
export declare type Accessors = ReturnType<typeof useAccessors>;
export declare type DataKeyAccessorFn = (item: DataItem) => DataItem;
export declare type DataKeyAccessor = string | DataKeyAccessorFn;
export declare type TextAccessorFn = (item: DataItem) => string;
export declare type TextAccessor = string | TextAccessorFn;
export declare const dataValue: (dataItem: DataItem, field?: string | DataKeyAccessorFn | undefined) => unknown;
export declare const dataText: (dataItem: DataItem, textField?: string | TextAccessorFn | undefined) => string;
/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */
export declare function valueMatcher(a: DataItem, b: DataItem, dataKey?: DataKeyAccessor): boolean;
export declare function dataIndexOf(data: readonly DataItem[], value: Value, dataKey?: DataKeyAccessor): number;
export declare function dataItem<TDataItem = DataItem>(data: readonly TDataItem[], value: Value, dataKey?: DataKeyAccessor): TDataItem;
export declare const useAccessors: (textField?: string | TextAccessorFn | undefined, dataKey?: string | DataKeyAccessorFn | undefined) => {
    text: (item: DataItem) => string;
    value: (item: DataItem) => unknown;
    indexOf: (data: readonly DataItem[], value: Value) => number;
    matches: (a: DataItem, b: DataItem) => boolean;
    findOrSelf: <TDataItem>(data: readonly TDataItem[], value: Value) => TDataItem;
    includes: (data: readonly DataItem[], value: Value) => boolean;
};
//# sourceMappingURL=Accessors.d.ts.map