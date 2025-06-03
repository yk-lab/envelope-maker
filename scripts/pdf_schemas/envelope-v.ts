import type { Template } from '@pdfme/common';

const fontName = 'NotoSansJP';

export const destSchema = ({
  outputPosition = false,
  useAffiliation = false,
}): Template['schemas'] => {
  return [
    {
      destZipcode1: {
        rotate: 335,
        type: 'text',
        position: {
          x: 59.4,
          y: 50.6,
        },
        width: 22,
        height: 10,
        alignment: 'left',
        fontSize: 28,
        characterSpacing: 6,
        lineHeight: 1,
      },
      destZipcode2: {
        rotate: 335,
        type: 'text',
        position: {
          x: 81.5,
          y: 39.7,
        },
        width: 27,
        height: 9.5,
        alignment: 'left',
        fontSize: 26,
        characterSpacing: 4,
        lineHeight: 1,
      },
      destAddress1: {
        rotate: 335,
        type: 'text',
        position: {
          x: 40.87,
          y: 117.21,
        },
        width: 103,
        height: 5,
        alignment: 'left',
        fontSize: 14,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      destAddress2: {
        rotate: 335,
        type: 'text',
        position: {
          x: 53.31,
          y: 120.24,
        },
        width: 93,
        height: 5,
        alignment: 'left',
        fontSize: 14,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      destAffiliation1: {
        rotate: 335,
        type: 'text',
        position: {
          x: useAffiliation ? 52.10 : 0,
          y: useAffiliation ? 131.84 : 0,
        },
        width: useAffiliation ? 98 : 0,
        height: useAffiliation ? 5 : 0,
        alignment: 'left',
        fontSize: 14,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      destAffiliation2: {
        rotate: 335,
        type: 'text',
        position: {
          x: useAffiliation ? 60.92 : 0,
          y: useAffiliation ? 136.55 : 0,
        },
        width: useAffiliation ? 93 : 0,
        height: useAffiliation ? 5 : 0,
        alignment: 'left',
        fontSize: 14,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      destPosition: {
        rotate: 335,
        type: 'text',
        position: {
          x: outputPosition ? (useAffiliation ? 63.93 : 58.02) : 0,
          y: outputPosition ? (useAffiliation ? 157.21 : 144.52) : 0,
        },
        width: outputPosition ? 31.75 : 0,
        height: outputPosition ? 6.5 : 0,
        alignment: 'left',
        fontSize: 18,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      destName: {
        rotate: 335,
        type: 'text',
        position: {
          x: useAffiliation
            ? outputPosition
              ? 88.48
              : 53.42
            : outputPosition
              ? 82.57
              : 48.47,
          y: useAffiliation
            ? outputPosition
              ? 134.73
              : 148.87
            : outputPosition
              ? 122.04
              : 133.53,
        },
        width: outputPosition ? 72.5 : 100,
        height: 8.5,
        alignment: outputPosition ? 'left' : 'center',
        fontSize: 24,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
    },
  ];
};

export const senderSchema = ({
  useAffiliation = false,
}): Template['schemas'] => {
  return [
    {
      senderZipcode: {
        rotate: 335,
        type: 'text',
        position: {
          x: 103.55,
          y: 213.77,
        },
        width: 85,
        height: 4,
        alignment: 'left',
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      senderAddress1: {
        rotate: 335,
        type: 'text',
        position: {
          x: 106.50,
          y: 220.11,
        },
        width: 85,
        height: 4,
        alignment: 'left',
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      senderAddress2: {
        rotate: 335,
        type: 'text',
        position: {
          x: 115.02,
          y: 221.66,
        },
        width: 85,
        height: 4,
        alignment: 'left',
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      senderAffiliation1: {
        rotate: 335,
        type: 'text',
        position: {
          x: useAffiliation ? 113.93 : 0,
          y: useAffiliation ? 227.68 : 0,
        },
        width: useAffiliation ? 85 : 0,
        height: useAffiliation ? 4 : 0,
        alignment: 'left',
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      senderAffiliation2: {
        rotate: 335,
        type: 'text',
        position: {
          x: useAffiliation ? 119.24 : 0,
          y: useAffiliation ? 230.72 : 0,
        },
        width: useAffiliation ? 85 : 0,
        height: useAffiliation ? 4 : 0,
        alignment: 'left',
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
      senderName: {
        rotate: 335,
        type: 'text',
        position: {
          x: useAffiliation ? 115.38 : 111.58,
          y: useAffiliation ? 239.15 : 230.99,
        },
        width: 85,
        height: 4.5,
        alignment: 'left',
        fontSize: 12,
        characterSpacing: 0,
        lineHeight: 1,
        fontName,
      },
    },
  ];
};

export const schema = ({
  outputDestPosition = false,
  useDestAffiliation = false,
  useSenderAffiliation = false,
}): Template['schemas'] => {
  return [
    {
      ...destSchema({
        outputPosition: outputDestPosition,
        useAffiliation: useDestAffiliation,
      })[0],
      ...senderSchema({ useAffiliation: useSenderAffiliation })[0],
    },
  ];
};
