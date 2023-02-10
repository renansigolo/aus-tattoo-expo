/** Join class names */
export const classNames = (...classes: string[] | any[]) =>
  classes.filter(Boolean).join(" ")
