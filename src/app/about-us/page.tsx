import CommonMembershipAbout from "@/components/common/common-member-about";
import React from "react";
const description =
  "You and your guests will appreciate the attention to detail our professional maintenance crew gives each vessel. The yachts we offer are clean and beautifully appointed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const About = () => {
  return (
    <>
      <CommonMembershipAbout
        subtitle=" Windward Sailing Club"
        title="About Us"
        description={description}
      />
    </>
  );
};

export default About;
