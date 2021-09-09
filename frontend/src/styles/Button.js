import React from 'react'
import styled from 'styled-components'

const ButtonWrap = styled.button`
    border-radius: 4px;
    color: white;
    font-weight: 600;
    background-color: var(--secondary);
    padding: 12px 24px;
    outline: none;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 2px rgba(0,0,0,0.3);
    transition: 0.1s all ease;
    &:hover{
        background-color: var(--secondary-darker);
    }
`

export default function Button(props) {
    const {children} = props;
    return (
        <ButtonWrap>
            {children}
        </ButtonWrap>
    )
}
