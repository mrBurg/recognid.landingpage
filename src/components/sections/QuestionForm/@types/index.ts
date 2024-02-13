type TItem = Record<'placeholder' | 'id', string>;

export type TQuestionForm = Record<
  | 'title'
  | 'subtitle'
  | 'policyCheckboxText'
  | 'validFormMessage'
  | 'validFormDescription'
  | 'validButtonText'
  | 'invalidWorkEmailMessage'
  | 'invalidPolicyCheckboxMessage'
  | 'invalidFormMessage'
  | 'invalidFormDescription'
  | 'invalidButtonText',
  string
> &
  Record<'firstName' | 'workEmail' | 'lastName' | 'companyName', TItem> &
  Record<'request', Record<'placeholder' | 'id' | 'size', string>>;
