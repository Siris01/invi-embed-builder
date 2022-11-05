import React from "react"
import styled from "styled-components"
import { monochromeLogo } from "../../icons/logo"
import { discohook, source } from "../utilities/constants"

const Container = styled.footer`
  margin: 16px;
  padding: 96px 0;

  border-top: 1px solid ${({ theme }) => theme.backgroundModifier.accent};

  color: ${({ theme }) => theme.interactive.normal};
  font-size: 16px;
`

const BrandContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 16px;

  & > svg {
    color: ${({ theme }) => theme.interactive.hover};

    width: 24px;
    height: 24px;

    margin-right: 16px;
  }
`

const BrandName = styled.h4`
  margin: 0;

  color: ${({ theme }) => theme.interactive.hover};
  font-size: 21px;
`

const Tagline = styled.p`
  margin: 0 0 20px;

  line-height: 1.375;
`

const NavigationList = styled.div`
  margin-bottom: 4px;
  display: flex;
  flex-flow: wrap;
`

const NavigationItem = styled.a`
  margin: 0 16px 8px 0;

  line-height: 1.5;
  color: inherit;

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.interactive.hover};
  }

  &:not(:disabled):focus {
    color: ${({ theme }) => theme.interactive.active};
  }
`

const LegalInfo = styled.p`
  margin: 0;
  font-size: 11px;
  line-height: 1.25;
`

export function Footer() {
  return (
    <Container>
      <BrandContainer>
        {monochromeLogo}
        <BrandName>Invi</BrandName>
      </BrandContainer>
      <Tagline>
        An embed builder forked from <a href={discohook}>Discohook</a>
      </Tagline>
      <NavigationList>
        <NavigationItem href="/embed/discord" target="_blank">
          Discord Support Server
        </NavigationItem>
        <NavigationItem href={source} target="_blank">
          Source Code
        </NavigationItem>
        <NavigationItem href={discohook} target="_blank">
          Discohook (Original Project)
        </NavigationItem>
        <NavigationItem href="https://patreon.com/vivifund" target="_blank">
          Support Discohook
        </NavigationItem>
      </NavigationList>
      <LegalInfo>
        This website is made available under the terms of the GNU AGPL v3
        license.
      </LegalInfo>
    </Container>
  )
}
