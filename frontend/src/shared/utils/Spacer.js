
import React from 'react'


export default function Spacer({space}) {
    const spaced = 36 * space
    return (
        <div style={{paddingTop: spaced}}/>
    )
}
