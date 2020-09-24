import markdown from './readme.md';

export default {
    title: 'MyComponent',
    component: 'my-component',
    parameters: {
        actions: {
            handles: ['ding'],
        },
        notes: { markdown },
	}
}

const Template = ({ firstName, middleName, lastName}) => {
    return `<my-component first="${firstName}" middle="${middleName}" last="${lastName}"></my-component>`;
}

export const BasicExample = Template.bind({});
BasicExample.args = { firstName: 'first', middleName: 'middle', lastName: 'last' };

export const AnotherBasicExample = Template.bind({});
AnotherBasicExample.args = { firstName: 'FIRST yeahh', middleName: 'MIDDLE yeahhhhh', lastName: 'LAST yeaaaahhh' };
