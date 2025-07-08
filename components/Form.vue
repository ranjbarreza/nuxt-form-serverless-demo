<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

type Schema = z.output<typeof schema>
const toast = useToast()

const schema = z.object({
  first: z.string(),
  last: z.string(),
  email: z.string().email('Invalid email'),
  message: z.string(),
})

const state = reactive<Partial<Schema>>({
  first: undefined,
  last: undefined,
  email: undefined,
  message: undefined,
})

function resetState() {
  state.first = undefined
  state.last = undefined
  state.email = undefined
  state.message = undefined
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/send-email', {
      method: 'POST',
      query: event.data,
    })
    toast.add({ title: 'Hurray', description: 'Message sent!', color: 'success' })
    resetState()
  } catch (err) {
    toast.add({ title: 'Something went wrong', description: 'Could not send message.', color: 'error' })
    console.error(err)
  }
}
</script>

<template>
  <div class="w-full">
    <div class="bg-primary-50 sm:w-full sm:max-w-[500px] p-6 sm:p-10 m-4 sm:mx-auto sm:my-20 rounded-lg">
      <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
        <UFormField name="first">
          <UInput id="first" v-model="state.first" size="xl" variant="outline" class="w-full"
            :ui="{ base: 'peer py-4' }" placeholder="" required>
            <InputWithFloatingLabel required input-id="first" label="First name" />
          </UInput>
        </UFormField>

        <UFormField name="last">
          <UInput id="last" v-model="state.last" placeholder="" size="xl" variant="outline" class="w-full"
            :ui="{ base: 'peer py-4' }" required>
            <InputWithFloatingLabel required input-id="last" label="Last name" />
          </UInput>
        </UFormField>

        <UFormField name="email">
          <UInput id="email" v-model="state.email" placeholder="" size="xl" class="w-full" variant="outline"
            :ui="{ base: 'peer py-4' }" required>
            <InputWithFloatingLabel required input-id="email" label="Work Email" />
          </UInput>
        </UFormField>

        <UFormField label="Message" name="message" required>
          <UTextarea required v-model="state.message" variant="outline" class="w-full" :rows="10" autoresize
            placeholder="Enter your message" :ui="{ base: 'py-4' }" />
        </UFormField>

        <p class="text-sm text-neutral-500">
          For information about our privacy practices and commitment to protecting your privacy, please review our
          <UButton variant="link" class="inline-block underline p-0" href="https://rebaar.com/" target="_blank">
            Privacy Policy
          </UButton>.
        </p>

        <UButton type="submit" loading-auto size="xl" class="shadow-[0_4px_4px_#00000040]">
          Send Message
        </UButton>
      </UForm>
    </div>
  </div>
</template>
