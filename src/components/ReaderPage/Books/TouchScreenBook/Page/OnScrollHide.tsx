import { Slide, useScrollTrigger } from "@mui/material";

interface Props {
    children: React.ReactElement;
}

export const HideOnScroll = ({ children }: Props) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};
