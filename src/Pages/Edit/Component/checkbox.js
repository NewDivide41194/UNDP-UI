import React from 'react'
import styled from 'styled-components'
import color from '../../../Feature/Config/color'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
  cursor: pointer;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  background: ${props => (props.checked ? color.green+';' : '#bfbfbf;')}
  border-radius: 25px;
  transition: all 150ms;
  

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 1px #66bb6a;
  }

  ${Icon} {
    visibility: visible;

  }
`

const Checkbox = ({ className, checked, ...props }) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 38">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
)

export default Checkbox
