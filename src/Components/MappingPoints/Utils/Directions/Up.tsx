
function Up({ active }: { active: boolean }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
        <path
          d="M8.50903 14.1139V1.70947"
          stroke={active ? "white":"#957474"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.30688 7.91168L8.50909 1.70947L14.7113 7.91168"
          stroke={active ? "white":"#957474"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  export default Up;
  