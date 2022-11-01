import React from "react"
import "tachyons"
import { Box, Heading, Text } from "rebass"
import {
  Hero
} from "react-landing-page"

const HeroSection = (props) => {
    return(
        <Box>
    <Hero
      color="white"
      backgroundImage="https://image.freepik.com/free-vector/colorful-memphis-design-background-vector_53876-81744.jpg"
      bg="black"
      bgOpacity={0.1}
    >
      <Heading fontSize={75}>I'mBesideYOU😊</Heading>
      <Text fontSize={[2, 3]}>Be the Change from Within</Text>
    </Hero>
  </Box>
    )
}
export default HeroSection
