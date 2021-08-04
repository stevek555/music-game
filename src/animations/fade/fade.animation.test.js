import React from 'react'
import { render as defaultRender } from '@testing-library/react'
import { FadeAnimation } from './fade.animation'

const render = () => {

    const { container } = defaultRender (
        <FadeAnimation>
            <span>children</span>
        </FadeAnimation>,
    )

    return {
        container,
    }

}

describe ('FadeAnimation', () => {

    describe ('container', () => {

        it ('should be defined and visible', () => {

            const { container } = render ()

            expect (container).toBeInTheDocument ()

            expect (container).toBeVisible ()

        })

        it ('should not be empty', () => {

            const { container } = render ()

            expect (container).not.toBeEmptyDOMElement ()

        })

    })

})