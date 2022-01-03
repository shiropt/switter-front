/* eslint-disable no-restricted-imports */
import { render } from '@testing-library/react'
import * as React from 'react'

import { AppButton } from '../../shared/AppButton'

describe('App', () => {
  const handleClick = jest.fn()
  const { asFragment } = render(<AppButton onClick={handleClick}>ボタン</AppButton>)

  it('snapshot test', () => {
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="chakra-button css-1jr8c6n"
          type="button"
        >
          ボタン
        </button>
      </DocumentFragment>
    `)
  })
})
