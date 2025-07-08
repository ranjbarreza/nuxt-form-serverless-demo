import { Resend } from 'resend'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { resendApiKey } = useRuntimeConfig(event)
  const resend = new Resend(resendApiKey)

  const schema = z.object({
    first: z.string(),
    last: z.string(),
    email: z.string(),
    message: z.string(),
  })

  const query = await getValidatedQuery(event, query => schema.safeParse(query))

  if (!query.success) {
    throw query.error.issues
  }

  const { first, last, email, message } = query.data

  try {
    await resend.emails.send({
      from: 'Serverless Form Demo <onboarding@resend.dev>',
      to: 'reza.r.baar@gmail.com',
      subject: 'New Form Submission',
      html: `
        <p><strong>Name:</strong> ${first} ${last}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return sendError(event, createError({ statusCode: 500, message: 'Email failed' }))
  }
})
