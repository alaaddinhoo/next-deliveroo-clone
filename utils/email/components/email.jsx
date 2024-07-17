import * as React from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";

export function Email(props) {
  const { url } = props;

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Stratos"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://nextjs-deliveroo-clone.netlify.app/fonts/Stratos-SemiBold.ttf",
            format: "woff2",
          }}
          fontWeight={600}
        />
      </Head>
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-Stratos px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto max-w-[465px]">
            <Section className="py-[32px] bg-[#00ccbb] h-32">
              <Img
                src="https://nextjs-deliveroo-clone.netlify.app/deliveroo-white-with-text.png"
                height="55"
                className="my-0 mx-auto object-contain"
              />
            </Section>
            <Container className="p-[20px]">
              <Heading className="text-[24px] font-normal text-center p-0 my-[30px] mx-0 leading-9">
                Click Below to{" "}
                <strong className="text-[#00ccbb]">Verify</strong> Your
                Deliveroo Account
              </Heading>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#00ccbb] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={url}
                >
                  Join the team
                </Button>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                or copy and paste this URL into your browser:{" "}
                <Link href={url} className="text-gray-400 no-underline">
                  {url}
                </Link>
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                If you were not expecting this invitation, you can ignore this
                email. If you are concerned about your account's safety, please
                reply to this email to get in touch with us.
              </Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default Email;
