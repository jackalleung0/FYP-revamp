import { Text, Button } from "@mantine/core";
import React from "react";
import {
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton
} from "react-share";
import { TelegramIcon } from "./TelegramIcon";
import { TwitterIcon } from "./TwitterIcon";
import { BottomSheet } from "react-spring-bottom-sheet";
import { LinkIcon } from "./LinkIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { showNotification } from "@mantine/notifications";
import CopyToClipboard from "react-copy-to-clipboard";
import { NotificationIcon } from "./NotificationIcon";

export const ShareSheet = ({ show, toggle, shareLink }: any) => {
  const copyToClipboard = () => {
    toggle();
    showNotification({
      message: "Copied to clipboard",
      icon: <NotificationIcon />,
      autoClose: 2000,
      disallowClose: true,
      closeButtonProps: { style: { color: "#0BB07B", width: 16, height: 16 } },
      styles: (theme) => ({
        root: {
          backgroundColor: "#EAFCF7",
          padding: 14,
          paddingLeft: "14px !important",
          width: 293,
          height: 45,
          margin: "0 auto",
        },
        icon: {
          backgroundColor: "unset !important" as "unset",
          width: "unset",
          height: "unset",
          marginRight: 14,
        },
        description: {
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "normal",
          lineHeight: "24px",
          color: "#00865A !important",
        },
      }),
    });
  };

  return (
    <BottomSheet
      open={show}
      onDismiss={toggle}
      defaultSnap={({ maxHeight }) => maxHeight * 0.95}
      expandOnContentDrag={false}
    >
      <div className="flex flex-col">
        <Text
          align="center"
          style={{
            fontFamily: "Inter",
            fontSize: 18,
            lineHeight: "28px",
            height: 22,
            fontWeight: "bold",
            paddingTop: 3,
          }}
        >
          Share Options
        </Text>

        <div
          style={{
            display: "flex",
            gap: 25 - 6 + 2,
            paddingLeft: 30 - 1 - 1,
            paddingRight: 30 - 1 - 1,
            paddingTop: 48,
            width: "max-content",
          }}
        >
          <CopyToClipboard text={shareLink} onCopy={copyToClipboard}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  borderRadius: 99,
                  background: "#F1F2F4",
                  display: "flex",
                  alignContent: "center",
                  justifyItems: "center",
                  width: 60,
                  height: 60,
                }}
              >
                <LinkIcon
                  style={{
                    padding: 16,
                  }} />
              </div>
              <Text
                align="center"
                style={{
                  paddingTop: 8 - 2,
                  fontFamily: "Inter",
                  fontWeight: "100",
                  fontSize: 12,
                  lineHeight: "20px",
                  color: "#4E5D78",
                }}
              >
                Copy Link
              </Text>
            </div>
          </CopyToClipboard>
          <TwitterShareButton url={shareLink}>
            <TwitterIcon width={60} />
            <Text
              align="center"
              style={{
                paddingTop: 8 - 2,
                fontFamily: "Inter",
                fontWeight: "100",
                fontSize: 12,
                lineHeight: "20px",
                color: "#4E5D78",
              }}
            >
              Twitter
            </Text>
          </TwitterShareButton>
          <WhatsappShareButton url={shareLink}>
            <WhatsAppIcon />
            <Text
              align="center"
              style={{
                paddingTop: 8 - 2,
                fontFamily: "Inter",
                fontWeight: "100",
                fontSize: 12,
                lineHeight: "20px",
                color: "#4E5D78",
                width: 60,
              }}
            >
              WhatsApp
            </Text>
          </WhatsappShareButton>
          <TelegramShareButton url={shareLink}>
            <TelegramIcon />
            <Text
              align="center"
              style={{
                paddingTop: 8 - 2,
                fontFamily: "Inter",
                fontWeight: "100",
                fontSize: 12,
                lineHeight: "20px",
                color: "#4E5D78",
              }}
            >
              Telegram
            </Text>
          </TelegramShareButton>
        </div>

        <div
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 48 - 5,
            marginBottom: 48 - 34,
          }}
        >
          <Button
            onClickCapture={toggle}
            fullWidth
            variant="outline"
            style={{
              color: "#4E5D78",
              fontFamily: "Inter",
              fontWeight: "normal",
              fontSize: "16px",
              lineHeight: "24px",
            }}
            radius="xl"
            styles={{
              inner: { padding: 12 },
              root: {
                height: "unset",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                borderColor: "#E1E4E8",
              },
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};
