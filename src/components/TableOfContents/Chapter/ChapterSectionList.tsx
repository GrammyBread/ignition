import { NavigationChapter } from "../../../interfaces/read/nav-data.interfaces";
import { Divider, List } from "@mui/material";
import getSection from "../Sections/shared";

interface ChapterSectionListProps {
    content: NavigationChapter;
}

export const ChapterSectionList = ({ content }: ChapterSectionListProps): JSX.Element => (
    <List sx={{ pl: 6 }}>
        {content.sections && content.sections.map((section) =>
            <div key={section.key}>
                {getSection(section)}
            </div>)}
    </List>
);