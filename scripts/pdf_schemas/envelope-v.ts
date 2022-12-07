import { Template } from "@pdfme/generator";

const fontName = "Noto Sans JP";

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
          width: 22,
          height: 10,
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
          width: 27,
          height: 9.5,
          alignment: "left",
          fontSize: 26,
          characterSpacing: 4,
          lineHeight: 1,
        },
        destAddress1: {
          rotate: 25,
          type: "text",
          position: {
            x: 39.9,
            y: 119.87,
          },
          width: 103,
          height: 5,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        destAddress2: {
          rotate: 25,
          type: "text",
          position: {
            x: 51.5,
            y: 121.08,
          },
          width: 93,
          height: 5,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        destAffiliation1: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 51.19 : 0,
            y: useAffiliation ? 132.26 : 0,
          },
          width: useAffiliation ? 98 : 0,
          height: useAffiliation ? 5 : 0,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        destAffiliation2: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 58.26 : 0,
            y: useAffiliation ? 135.58 : 0,
          },
          width: useAffiliation ? 93 : 0,
          height: useAffiliation ? 5 : 0,
          alignment: "left",
          fontSize: 14,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        destPosition: {
          rotate: 25,
          type: "text",
          position: {
            x: outputPosition ? (useAffiliation ? 54.32 : 47.56) : 0,
            y: outputPosition ? (useAffiliation ? 150.79 : 136.29) : 0,
          },
          width: outputPosition ? 31.75 : 0,
          height: outputPosition ? 6.5 : 0,
          alignment: "left",
          fontSize: 18,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        destName: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation
              ? outputPosition
                ? 82.2
                : 53.42
              : outputPosition
              ? 75.44
              : 46.66,
            y: useAffiliation
              ? outputPosition
                ? 135.45
                : 148.87
              : outputPosition
              ? 120.95
              : 134.37,
          },
          width: outputPosition ? 72.5 : 100,
          height: 8.5,
          alignment: outputPosition ? "left" : "center",
          fontSize: 24,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
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
            x: 110.73,
            y: 229.18,
          },
          width: 40,
          height: 4,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
        },
        senderAddress1: {
          rotate: 25,
          type: "text",
          position: {
            x: 113.27,
            y: 234.61,
          },
          width: 85,
          height: 4,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        senderAddress2: {
          rotate: 25,
          type: "text",
          position: {
            x: 121.36,
            y: 235.26,
          },
          width: 78,
          height: 4,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        senderAffiliation1: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 120.69 : 0,
            y: useAffiliation ? 242.19 : 0,
          },
          width: useAffiliation ? 81.5 : 0,
          height: useAffiliation ? 4 : 0,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        senderAffiliation2: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 125.58 : 0,
            y: useAffiliation ? 244.32 : 0,
          },
          width: useAffiliation ? 78 : 0,
          height: useAffiliation ? 4 : 0,
          alignment: "left",
          fontSize: 10,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
        },
        senderName: {
          rotate: 25,
          type: "text",
          position: {
            x: useAffiliation ? 121.72 : 117.49,
            y: useAffiliation ? 252.74 : 243.68,
          },
          width: 85,
          height: 4.5,
          alignment: "left",
          fontSize: 12,
          characterSpacing: 0,
          lineHeight: 1,
          fontName,
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
