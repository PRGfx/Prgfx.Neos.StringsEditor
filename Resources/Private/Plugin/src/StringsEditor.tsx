import React, { useMemo, useState } from 'react';
import {
    IconButton,
    MultiSelectBox_ListPreviewSortable,
    SelectBox_Option_SingleLine,
    TextInput,
} from '@neos-project/react-ui-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './StringsEditor.module.css';

type StringsEditorProps = {
    id: string;
    value: string[];
    options: unknown;
    commit: (value: string[]) => void;
    i18nRegistry: { translate: (key: string) => string };
    disabled?: boolean;
}

const valueAccessor = (x: { key: string }): string => x.key;

const isObject = (e: unknown): e is Record<string, unknown> => {
    return typeof e === 'object' && e !== null && !Array.isArray(e);
};

type StringsEditorOptions = {
    unique: boolean;
    placeholder?: string;
    maximumItems?: number;
}

const getOptions = (options: unknown): StringsEditorOptions => {
    const result: StringsEditorOptions = {
        unique: true,
    };

    if (isObject(options)) {
        if ('unique' in options) {
            result.unique = options.unique !== false;
        }

        if (typeof options.placeholder === 'string') {
            result.placeholder = options.placeholder;
        }

        if (typeof options.maximumItems === 'number' && result.maximumItems > 0) {
            result.maximumItems = options.maximumItems;
        }
    }

    return result;
};

export const StringsEditor = (props: StringsEditorProps) => {
    console.log('StringsEditor', props);
    const [ input, setInput ] = useState('');

    const {
        unique,
        placeholder,
        maximumItems,
    } = useMemo(() => {
        return getOptions(props.options);
    }, [ props.options ]);

    const inputEmpty = input.trim().length === 0;
    const inputUnique = !unique || !props.value.includes(input);
    const hasMaxItems = maximumItems !== undefined && props.value.length >= maximumItems;
    const inputValid = !inputEmpty && inputUnique && !hasMaxItems;

    const handleSubmit = () => {
        if (!inputValid) {
            return;
        }

        props.commit([ ...props.value, input ]);
        setInput('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const options = useMemo(() => {
        return props.value.map(item => ({
            label: item,
            key: item,
        }));
    }, [ props.value ]);

    return (
        <div>
            <ul className={styles.list}>
                <MultiSelectBox_ListPreviewSortable
                    disabled={props.disabled}
                    values={props.value}
                    options={options}
                    optionValueAccessor={valueAccessor}
                    onValuesChange={props.commit}
                    ListPreviewElement={SelectBox_Option_SingleLine}
                    dndType="multiselect-box-value"
                />
            </ul>
            <div className={styles.inputWrapper}>
                <TextInput
                    id={props.id}
                    value={input}
                    onChange={setInput}
                    onKeyUp={handleKeyPress}
                    disabled={props.disabled || hasMaxItems}
                    placeholder={placeholder ? props.i18nRegistry.translate(placeholder) : undefined}
                    className={styles.input}
                />
                <IconButton
                    icon="check"
                    onClick={handleSubmit}
                    disabled={props.disabled || !inputValid}
                    className={styles.submitButton}
                    style="neutral"
                />
            </div>
        </div>
    );
};
