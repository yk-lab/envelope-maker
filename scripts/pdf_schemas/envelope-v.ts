import { Template } from "@pdfme/generator";

export const destSchema = ({
  outputPosition = false,
  useAffiliation = false,
}): Pick<Template, "schemas"> => {
  return {
    schemas: [
      {
        destZipcode1: {
          rotate: 25,
          type: "text",
          position: {
            x: 62.3,
            y: 54.0,
          },
          width: 40,
          height: 12,
          alignment: "left",
          fontSize: 28,
          characterSpacing: 6,
          lineHeight: 1,
        },
        destZipcode2: {
          rotate: 25,
          type: "text",
          position: {
            x: 84.5,
            y: 44.4,
          },
          width: 40,
          height: 12,
          alignment: "left",
          fontSize: 26,
          characterSpacing: 4,
          lineHeight: 1,
        },
        destAddress1: {
          rotate: 25,
          type: "text",
          position: {
            x: 40,
            y: 120,
          },
          width: 105,
          height: 5,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        destAddress2: {
          rotate: 25,
          type: "text",
          position: {
            x: 51.5,
            y: 121,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        destAffiliation1: {
          rotate: 25,
          type: "text",
          position: {
            x: 51.5,
            y: 132,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        destAffiliation2: {
          rotate: 25,
          type: "text",
          position: {
            x: 58.5,
            y: 136,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        destPosition: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 54 : 51.5,
            y: useAffiliation ? 152 : 132,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 18,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        destName: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 82.5 : outputPosition ? 80 : 51.5,
            y: useAffiliation ? 137 : outputPosition ? 117 : 132,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 24,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
      },
    ],
  };
};

export const senderSchema = ({
  useAffiliation = false,
}): Pick<Template, "schemas"> => {
  return {
    schemas: [
      {
        senderZipcode: {
          rotate: 25,
          type: "text",
          position: {
            x: 109,
            y: 224,
          },
          width: 40,
          height: 12,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
        },
        senderAddress1: {
          rotate: 25,
          type: "text",
          position: {
            x: 111,
            y: 229,
          },
          width: 105,
          height: 5,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        senderAddress2: {
          rotate: 25,
          type: "text",
          position: {
            x: 120,
            y: 230.5,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        senderAffiliation1: {
          rotate: 25,
          type: "text",
          position: {
            x: 119.5,
            y: 238,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        senderAffiliation2: {
          rotate: 25,
          type: "text",
          position: {
            x: 124.5,
            y: 241,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
        senderName: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 123.5 : 119.5,
            y: useAffiliation ? 248 : 238,
          },
          width: 100,
          height: 16,
          alignment: "left",
          fontSize: 12,
          characterSpacing: 0,
          lineHeight: 1,
          fontName: "noto_sans_jp",
        },
      },
    ],
  };
};

export const schema = ({
  outputDestPosition = false,
  useDestAffiliation = false,
  useSenderAffiliation = false,
}): Pick<Template, "schemas"> => {
  return {
    schemas: [
      {
        ...destSchema({
          outputPosition: outputDestPosition,
          useAffiliation: useDestAffiliation,
        }).schemas[0],
        ...senderSchema({ useAffiliation: useSenderAffiliation }).schemas[0],
      },
    ],
  };
};
