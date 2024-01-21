function Right({ active }: { active: boolean }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M11.8259 10.4291L16.2561 5.999L11.8259 1.56885"
          stroke={active ? "white":"#957474"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.07983 15.7453V9.54314C2.07983 7.58578 3.66659 5.99902 5.62395 5.99902H16.2563"
          stroke={active ? "white":"#957474"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  export default Right;
  