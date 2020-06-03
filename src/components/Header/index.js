import React from "react";
import { BannerContainer, Logo } from "./style";
import logo from "../../images/logo.jpg";

const Header = () => {
  return (
    <header>
      <BannerContainer>
        <Logo src={logo} alt="logo" />
      </BannerContainer>
    </header>
  );
};

export default Header;
