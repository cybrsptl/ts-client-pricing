import { Icon } from '@chakra-ui/react'
import * as React from 'react'
import { FiCheck, FiMinus } from 'react-icons/fi'

interface FeatureProps {
  value: string | number | boolean
}

export const Feature = (props: FeatureProps) =>
  typeof props.value === 'boolean' ? (
    <Icon
      as={props.value ? FiCheck : FiMinus}
      boxSize="6"
      color={props.value ? 'accent' : 'subtle'}
    />
  ) : (
    <>{props.value}</>
  )
