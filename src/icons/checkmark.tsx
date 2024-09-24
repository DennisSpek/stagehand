export const CheckMark = ({ fill='#5650F5' } : { fill: string }) => {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0207 3.1239L6.3473 11.2695C5.60215 11.9693 4.44922 11.9945 3.67414 11.328L1.01308 9.03979C0.459822 8.56404 0.412353 7.72396 0.908502 7.18891C1.38952 6.67018 2.19905 6.63694 2.72097 7.1145L3.65512 7.96926C4.43254 8.68061 5.62853 8.66673 6.38924 7.93754L13.3013 1.31179C13.7773 0.855453 14.5261 0.847827 15.0114 1.29437C15.5453 1.78573 15.5496 2.62714 15.0207 3.1239Z" fill={fill}/>
    </svg>
  )
}