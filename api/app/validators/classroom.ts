import vine from '@vinejs/vine'

export const createClassroomValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

export const inviteStudentValidator = vine.compile(
  vine.object({
    email: vine.string(),
  })
)
