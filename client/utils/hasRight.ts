import { useUserStore } from "stores/user";

export enum Rights {
  canCreateClassroom,
  canViewStudent,
  canManageStudents,
  canAttachStudent,
}

export function hasRights(right: Rights) {
  const user = useUserStore.getState().user;
  switch (right) {
    case Rights.canCreateClassroom:
      if (user.type === "teacher") return true;
      break;
    case Rights.canViewStudent:
      if (user.type === "teacher") return true;
      break;
    case Rights.canManageStudents:
      if (user.type === "teacher") return true;
      break;
    case Rights.canAttachStudent:
      if (user.type === "student") return true;
      break;
  }

  return false;
}
