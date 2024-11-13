import vine from '@vinejs/vine'

export const createExerciseValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(250),
    language: vine.enum(['javascript', 'typescript']),
    instructions: vine.string(),
    expected: vine.string(),
  })
)

export const updateExerciseValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(250),
    instructions: vine.string(),
    expected: vine.string(),
  })
)
