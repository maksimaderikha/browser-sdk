import type { ReactNode } from 'react'
import React from 'react'
import { Alert as MantineAlert, Center, Group, MantineProvider, Space } from '@mantine/core'

export function Alert({
  level,
  title,
  message,
  button,
}: {
  level: 'warning' | 'error'
  title?: string
  message: string
  button?: ReactNode
}) {
  const color = level === 'warning' ? ('orange' as const) : ('red' as const)
  return (
    <Center mt="xl">
      <MantineAlert color={color} title={title}>
        {message}
        {button && (
          <>
            <Space h="sm" />
            <MantineProvider theme={{ components: { Button: { defaultProps: { color } } } }}>
              <Group position="right">{button}</Group>
            </MantineProvider>
          </>
        )}
      </MantineAlert>
    </Center>
  )
}
