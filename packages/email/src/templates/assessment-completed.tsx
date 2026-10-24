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

interface AssessmentCompletedEmailProps {
  userName?: string;
  archetypeCode?: string;
  archetypeName?: string;
  reportUrl?: string;
}

export function AssessmentCompletedEmail({
  userName = "Cognitive Explorer",
  archetypeCode = "INTJ",
  archetypeName = "The Mastermind Strategist",
  reportUrl = "https://watq.app/result",
}: AssessmentCompletedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your cognitive diagnosis report is ready: {archetypeCode} ({archetypeName})
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Watq</Heading>
          <Text style={subheadingStyle}>Cognitive Report Decoded</Text>
          <Section style={cardStyle}>
            <Text style={textStyle}>Hello {userName},</Text>
            <Text style={textStyle}>
              Your psychological assessment has been processed with 100% mathematical determinism.
              Your primary cognitive archetype has been identified as:
            </Text>
            <Section style={archetypeBoxStyle}>
              <Text style={archetypeCodeStyle}>{archetypeCode}</Text>
              <Text style={archetypeNameStyle}>{archetypeName}</Text>
            </Section>
            <Button style={buttonStyle} href={reportUrl}>
              Access Full Diagnostic Report
            </Button>
            <Text style={footerTextStyle}>
              Aligned with ILO ISCO-08 & UNESCO ISCED-F 2013 vocational taxonomies.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default AssessmentCompletedEmail;

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

const archetypeBoxStyle: React.CSSProperties = {
  backgroundColor: "rgba(212, 240, 36, 0.06)",
  border: "1px solid rgba(212, 240, 36, 0.25)",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center" as const,
  margin: "20px 0",
};

const archetypeCodeStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#D4F024",
  letterSpacing: "0.1em",
  margin: "0 0 4px 0",
};

const archetypeNameStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#F1F5F9",
  margin: "0",
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
