import { Theme } from "@mui/material";
import { HomeButton } from '../../../interfaces/static/home.interfaces';
import { PatreonButton } from './Buttons/PatreonButton';
import { LoreButton } from './Buttons/LoreButton';
import { ReadButton } from "./Buttons/ReadButton";

export interface CtaAreaProps {
    buttons: HomeButton[];
}

export interface ButtonElements {
    patreonBtn: JSX.Element;
    loreBtn: JSX.Element;
    readBtn: JSX.Element;
}

export function MakeButtons(buttons: HomeButton[]): ButtonElements | undefined {
    let elems = {
    } as ButtonElements;

    buttons.forEach(btn => {
        if (btn.button_type === 'Patreon') {
            elems.patreonBtn = <PatreonButton {...btn} />;
        }
        else if (btn.button_type === 'Lore') {
            elems.loreBtn = <LoreButton {...btn} />;
        }
        else if (btn.button_type === 'Read') {
            elems.readBtn = <ReadButton {...btn} />;
        }
    });

    return elems;
}