import AttachesTool from '@editorjs/attaches';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import { type ToolConstructable, type ToolSettings } from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import EditorjsList from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import RawTool from '@editorjs/raw';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import Warning from '@editorjs/warning';
import Alert from 'editorjs-alert';
import ColorPicker from 'editorjs-color-picker';
import EJLaTeX from 'editorjs-latex';

export interface ToolOptions {
  uploadFile: (file: File) => Promise<{ publicUrl: string } | undefined>;
  uploadFileByUrl: (
    fileUrl: string,
  ) => Promise<{ publicUrl: string } | undefined>;
}

export const makeTools: (
  options: ToolOptions,
) => Record<string, ToolConstructable | ToolSettings> = ({
  uploadFile,
  uploadFileByUrl,
}) => ({
  delimiter: {
    class: Delimiter,
    inlineToolbar: true,
  },
  raw: {
    class: RawTool,
    inlineToolbar: true,
  },
  underline: {
    class: Underline,
    inlineToolbar: true,
  },
  code: {
    class: CodeTool,
    inlineToolbar: true,
  },
  image: {
    class: ImageTool,
    inlineToolbar: true,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        uploadByFile: async (file: File) => {
          const { success, url } = await uploadFile(file)
            .then((i) => {
              if (i) {
                return i;
              }
              throw new Error('Failed to upload file');
            })
            .then(({ publicUrl: url }) => ({ url, success: 1 }))
            .catch((err) => ({ url: undefined, success: 0, err }));
          return {
            success,
            file: {
              url,
              // any other image data you want to store, such as width, height, color, extension, etc
            },
          };
        },
        uploadByUrl: async (fileUrl: string) => {
          const { success, url } = await uploadFileByUrl(fileUrl)
            .then((i) => {
              if (i) {
                return i;
              }
              throw new Error('Failed to upload file');
            })
            .then(({ publicUrl: url }) => ({ url, success: 1 }))
            .catch((err) => ({ url: undefined, success: 0, err }));
          return {
            success,
            file: {
              url,
              // any other image data you want to store, such as width, height, color, extension, etc
            },
          };
        },
      },
    },
  },
  attaches: {
    class: AttachesTool,
    inlineToolbar: true,
    config: {
      uploader: {
        uploadByFile: async (file: File) => {
          const { success, url } = await uploadFile(file)
            .then((i) => {
              if (i) {
                return i;
              }
              throw new Error('Failed to upload file');
            })
            .then(({ publicUrl: url }) => ({ url, success: 1 }))
            .catch((err) => ({ url: undefined, success: 0, err }));
          return {
            success,
            file: {
              url,
              name: file.name,
              size: file.size,
              extension: file.type,
            },
          };
        },
      },
    },
  },
  list: {
    class: EditorjsList as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
    },
  },
  Math: {
    class: EJLaTeX,
    shortcut: 'CMD+SHIFT+L',
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        github: true,
        codepen: true,
      },
    },
  },
  table: {
    class: Table as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  alert: {
    class: Alert,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+A',
    config: {
      alertTypes: [
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'danger',
        'light',
        'dark',
      ],
      defaultType: 'primary',
      messagePlaceholder: 'Enter something',
    },
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+I',
  },
  Marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  ColorPicker: {
    class: ColorPicker as unknown as ToolConstructable,
  },
  paragraph: {
    class: Paragraph as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  header: {
    class: Header as unknown as ToolConstructable,
    shortcut: 'CMD+SHIFT+H',
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: "Quote's author",
    },
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+W',
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  },
});
