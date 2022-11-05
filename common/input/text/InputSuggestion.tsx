/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { joinVariables, leaveVariables } from "../../utilities/constants";
import styles from "./InputSuggestion.module.css";

export type InputSuggestionProps = {
    value: string
    changeValue: (value: string) => void
}

export const InputSuggestion = (props: InputSuggestionProps) => {
    const [variables, setVariables] = useState<{ name: string; description: string; }[] | null>([]);
    useEffect(() => {
        const { type } = JSON.parse(localStorage.getItem("memory") ?? "{}");
        if (!type) setVariables(null);

        if (type === "join") setVariables(joinVariables);
        else if (type === "leave") setVariables(leaveVariables);
        else setVariables(null);
    }, [])

    if (!variables || props.value.length === 0) return <></>

    const currVariable = props.value.slice(props.value.lastIndexOf("${") + 1);
    if (currVariable.startsWith("{") && currVariable.endsWith("}")) return <></>

    const possible = variables.filter(v => `{${v.name}}`.startsWith(currVariable));
    if (possible.length === 0) return <></>

    return <div className={styles.container}>{possible.map(v => <div key={v.name} className={styles.row}>{v.name} - {v.description}</div>)}</div>
};

