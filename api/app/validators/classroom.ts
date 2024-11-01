import vine from '@vinejs/vine'

export const createClassroomValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)

export const inviteStudentValidator = vine.compile(
  vine.object({
    email: vine.string(),
  })
)

export const updateClassroomValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)
