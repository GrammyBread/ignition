import { Box, Container, Theme } from "@mui/material";
import { DetailsSection, PageViewDetails } from "./DetailsSection/DetailsSection";
import Styles from "./HomePage.module.scss";
import { HomeMetadata } from '../../interfaces/static/home.interfaces';
import { CtaMobileArea } from "./CTAs/CTAMobile";
import { HeroSection } from "./Hero/Hero";

export const MobileHome = (data: HomeMetadata, pageSetup: PageViewDetails): JSX.Element => {
    return (
            <Container className={Styles.homeBody} maxWidth="md">
                <HeroSection details={data} setup={pageSetup} />
                {data.body.sections.map((section) => (
                    <DetailsSection
                        key={section.alt_image}
                        section={section}
                        setup={pageSetup}
                    />
                ))}
                <CtaMobileArea buttons={data.call_to_actions.buttons} />
            </Container>
    );
};