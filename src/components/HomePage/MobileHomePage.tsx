import { Box, Container } from "@mui/material";
import { DetailsSection, PageViewDetails } from "./DetailsSection/DetailsSection";
import Styles from "./HomePage.module.scss";
import { HomeMetadata } from '../../interfaces/static/home.interfaces';
import { HeroSection } from "./Hero/Hero";
import { FooterSection } from "./Footer/Footer";
import classNames from "classnames";

export const MobileHome = (data: HomeMetadata, pageSetup: PageViewDetails): JSX.Element => {
    return (
        <>
            <HeroSection details={data} setup={pageSetup} />
            <Container className={classNames(Styles.homeBody, Styles.mobile)} maxWidth="lg">
                <Box sx={{
                    height: "4vh",
                    background: "black",
                    width: "100%"
                }}/>
                {data.body.sections.map((section) => (
                    <DetailsSection
                        key={section.alt_image}
                        section={section}
                        setup={pageSetup}
                    />
                ))}
            </Container>
            <FooterSection details={data} setup={pageSetup} />
        </>
    );
};