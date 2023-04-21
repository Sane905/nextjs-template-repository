---
to: <%= `src/components/${name}/${name}` %>.tsx
---
import { Stack } from "@chakra-ui/react";
import React, { memo } from "react";

type Props = {};
<% componentName = h.changeCase.pascal(name) %>
export const <%= componentName %> = memo<Props>(() => {
  return <Stack></Stack>;
});
