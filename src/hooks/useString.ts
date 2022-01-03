const messages = [
  {
    en: 'Password did not conform with policy: Password not long enough',
    ja: 'パスワードは8文字以上にしてください',
  },
  {
    en: "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[S]+.*[S]+$",
    ja: 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
  },
  {
    en: 'User does not exist.',
    ja: 'ユーザーが存在しません',
  },
  {
    en: 'User does not exist.',
    ja: 'ユーザーが存在しません',
  },
  {
    en: 'Incorrect username or password.',
    ja: 'ユーザー名またはパスワードが違います',
  },
  {
    en: 'User is not confirmed.',
    ja: 'ユーザーは検証されていません',
  },
  {
    en: 'User already exists',
    ja: 'このなまえは既に存在します',
  },
  {
    en: 'Invalid verification code provided, please try again.',
    ja: '指定された確認コードが無効です。もう一度お試しください',
  },
  {
    en: 'Invalid password format',
    ja: 'パスワードのフォーマットが不正です',
  },
  {
    en: 'Invalid phone number format',
    ja: '不正な電話番号フォーマットです。',
  },
  {
    en: 'An account with the given email already exists.',
    ja: 'そのメールアドレスは既に存在します',
  },
  {
    en: 'Username cannot be empty',
    ja: 'ユーザー名は必須です',
  },
  {
    en: 'Password attempts exceeded',
    ja: 'パスワード試行回数が超過しました',
  },
  {
    en: 'Password cannot be empty',
    ja: 'パスワードは必須入力です',
  },
  {
    en: "Attempt limit exceeded, please try after some time.'",
    ja: '試行制限を超過しました。しばらくしてからもう一度お試しください',
  },
  {
    en: 'Username/client id combination not found.',
    ja: 'ユーザーが存在しません',
  },
  {
    en: 'Password does not conform to policy: Password not long enough',
    ja: 'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)',
  },
  {
    en: 'Password does not conform to policy: Password must have uppercase characters',
    ja: 'パスワードには大文字を含めてください (8文字以上の大文字小文字を含む英数字)',
  },
  {
    en: 'Password does not conform to policy: Password must have lowercase characters',
    ja: 'パスワードには小文字を含めてください (8文字以上の大文字小文字を含む英数字)',
  },
  {
    en: 'Password does not conform to policy: Password must have numeric characters',
    ja: 'パスワードには数字を含めてください (8文字以上の大文字小文字を含む英数字)',
  },
  {
    en: "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6",
    ja: 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
  },
  {
    en: 'User account already exists',
    ja: 'このなまえは既に存在します',
  },
]

export const transJaMessage = (enMessage: string) => {
  if (!enMessage) {
    return
  }
  const errorMessage = messages.find((message) => message.en === enMessage)?.ja || 'エラーが発生しました'
  return errorMessage
}
