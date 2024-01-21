

function Left({ active }: { active: boolean }) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.43186 10.6838L2.00171 6.25364L6.43186 1.82349"
          stroke={active ? "white":"#957474"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.1782 16V9.79778C16.1782 7.84042 14.5914 6.25366 12.6341 6.25366H2.00171"
          stroke={active ? "white":"#957474"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  export default Left;