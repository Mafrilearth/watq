import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type * as React from "react";

interface MagicLinkEmailProps {
  url?: string;
  userName?: string;
}

export function MagicLinkEmail({
  url = "https://watq.app/login",
  userName = "Cognitive Explorer",
}: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your secure sign-in link for Watq (Personality Decoded)</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Watq</Heading>
          <Text style={subheadingStyle}>Personality Decoded</Text>
          <Section style={cardStyle}>
            <Text style={textStyle}>Hello {userName},</Text>
            <Text style={textStyle}>
              Click the button below to sign in to your Watq account. This link will expire in 10
              minutes.
            </Text>
            <Button style={buttonStyle} href={url}>
              Sign In to Watq
            </Button>
            <Text style={footerTextStyle}>
              If you did not request this link, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default MagicLinkEmail;

const mainStyle: React.CSSProperties = {
  backgroundColor: "#08090C",
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  color: "#F8FAFC",
  padding: "40px 0",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "0 20px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  letterSpacing: "-0.04em",
  color: "#D4F024",
  margin: "0 0 4px 0",
};

const subheadingStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#94A3B8",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  margin: "0 0 24px 0",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#0C0E14",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "12px",
  padding: "32px",
};

const textStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#E2E8F0",
  margin: "0 0 16px 0",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#D4F024",
  color: "#08090C",
  padding: "12px 24px",
  borderRadius: "6px",
  fontWeight: 600,
  fontSize: "14px",
  textDecoration: "none",
  display: "inline-block",
  margin: "16px 0 24px 0",
};

const footerTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#64748B",
  margin: "0",
};
