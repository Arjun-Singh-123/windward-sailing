import CommonMembershipAbout from "@/components/common/common-member-about";
import React from "react";
const description =
  "You and your guests will appreciate the attention to detail our professional maintenance crew gives each vessel. The yachts we offer are clean and beautifully appointed.";

const About = () => {
  return (
    <section className="w-full section-py-80">
      <CommonMembershipAbout
        subtitle=" Newport Sailing Club"
        title="About Us"
        description={description}
        imageUrl="/images/about.jpg"
        image={true}
      />
    </section>
  );
};

export default About;
