import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { AppButton } from '../components/shared/AppButton'

export default {
  title: 'Example/AppButton',
  component: AppButton,
  argTypes: {
    onClick: jest.fn(),
  },
} as ComponentMeta<typeof AppButton>

const Template: ComponentStory<typeof AppButton> = (args) => <AppButton {...args}>Test</AppButton>

export const Test = Template.bind({})

Test.args = {
  onClick: jest.fn(),
}
