import { Divider, Paper, Typography } from "@mui/material"

export interface AppendixHeaderProps {
    title: string;
    content: string;
}

export const AppendixHeader = ({title, content}: AppendixHeaderProps) => {
   return  <Paper
    sx={{
        flex: 1,
        padding: "1rem",
        margin: "1rem 0",
    }}
>
    <Typography
        gutterBottom
        variant="h2"
        component="h1"
        textAlign={"center"}
        sx={{
            lineHeight: "1",
        }}
    >
        {title}
    </Typography>
    <Divider variant="middle" />
    <Typography
        gutterBottom
        variant="body1"
        component="h2"
        textAlign={"center"}
        sx={{ margin: "1rem" }}
    >
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </Typography>
</Paper>
}