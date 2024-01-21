import { Font } from '@ckeditor/ckeditor5-font';

export const config = {
  allowedContent: true,
  fontFamily: {
    options: [
        'default',
        'Ubuntu, Arial, sans-serif',
        'Ubuntu Mono, Courier New, Courier, monospace'
    ]
},
fontSize: {
  items: [
		{
			label: 'Tiny',
			// Used as attribute name:
			model: 'text-tiny',
			stopValue: 10,
			// Uses the ViewElementConfigDefinition interface:
			view: {
				name: 'span',
				classes: 'text-tiny'
			}
		},
		// Using styles:
		{
			label: 'Small',
			model: 'text-small',
			stopValue: 12,
			view: {
				name: 'span',
				styles: 'font-size: 12px'
			}
		}
	]
},
  toolbar: {
    items:['heading', "|" , 'undo', 'redo', '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',]
  },
  extraPlugins:{},
  heading: {
    options: [
      {
        model: "paragraph",
        title: "Paragraph",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3",
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4",
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5",
      },
      {
        model: "heading6",
        view: "h6",
        title: "Heading 6",
        class: "ck-heading_heading6",
      },
    ],
  },
  fontFamily: {
    options: [
        'default',
        'Ubuntu, Arial, sans-serif',
        'Ubuntu Mono, Courier New, Courier, monospace'
    ]
},
fontSize: {
  options: [
      9,
      11,
      13,
      'default',
      17,
      19,
      21
  ]
},
};
