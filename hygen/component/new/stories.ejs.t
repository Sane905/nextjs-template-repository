---
to: <%= `src/components/${name}/${name}` %>.stories.tsx
---
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
<% componentName = h.changeCase.pascal(name) %>
import { <%= componentName %> } from "./<%= componentName %>";

export default {
  title: "TwitterClone / Components / <%= name %>",
  component: <%= componentName %>,
} as ComponentMeta<typeof <%= name %>>;

export const Default: ComponentStoryObj<typeof <%= componentName %>> = {
  args: {},
};
