import { renderSuspended } from '@nuxt/test-utils/runtime'
import { expect, it } from 'vitest'
import InputWithFloatingLabel from '@/components/InputWithFloatingLabel.vue'

const props = {
  inputId: 'id',
  label: 'Label'
}

it('shows Label', async () => {
  const { getByText, queryByText } = await renderSuspended(InputWithFloatingLabel, {
    props
  })

  getByText('Label')
  expect(queryByText('*')).toBe(null)
})

it('shows Label with a required sign', async () => {
  const { getByText } = await renderSuspended(InputWithFloatingLabel, {
    props: {
      required: true,
      ...props
    }
  })
  getByText('*')
})