/* eslint-disable no-restricted-imports */
import { render } from '@testing-library/react'
import * as React from 'react'

import { AppButton } from '../shared/AppButton'

describe('App', () => {
  const handleClick = jest.fn()
  const { asFragment } = render(<AppButton onClick={handleClick}>ボタン</AppButton>)

  it('snapshot test', () => {
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          style="border-radius: 3px; background-color: rgb(255, 255, 255); padding: 8px 16px; min-width: 100px; font-size: 14px; font-weight: bold; color: rgb(68, 39, 0); border: 1px solid gray; cursor: pointer;"
        >
          ボタン
        </button>
      </DocumentFragment>
    `)
  })
})
