export function MailStar({ isFilled }) {
  const fillColor = isFilled ? 'yellow' : 'gray'

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -960 960 960'
      width='24'
      height='24'
    >
      <path
        fill={fillColor}
        d='m333-219 147-88 148 89-40-166 130-113-171-15-67-158-66 157-171 15 130 112-40 167ZM223-67l68-292L64-556l300-25 116-276 117 276 299 25-227 197 68 292-257-155L223-67Zm257-367Z'
      />
    </svg>
  )
}
