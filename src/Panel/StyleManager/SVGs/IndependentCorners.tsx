function IndependentCorners({ activeElement }: { activeElement: string }) {
  return (
    <div className="">
      <button className="control-btn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Part */}
          <path
            d="M11.6936 0L8.77018 0V1.4617L11.6936 1.4617V4.38509H13.1553V1.4617C13.1553 0.657763 12.4975 0 11.6936 0Z"
            fill={activeElement === "y" ? "#ED1C24" : "#B5B5B5"}
          />

          {/* Left Part */}
          <path
            d="M4.38509 1.4617V0L1.4617 0C0.657763 0 0 0.657763 0 1.4617V4.38509H1.4617V1.4617L4.38509 1.4617Z"
            fill={activeElement === "x" ? "#ED1C24" : "#B5B5B5"}
          />

          {/* Right Part */}
          <path
            d="M13.1553 11.6936V8.77018H11.6936V11.6936H8.77018V13.1553H11.6936C12.4975 13.1553 13.1553 12.4975 13.1553 11.6936Z"
            fill={activeElement === "h" ? "#ED1C24" : "#B5B5B5"}
          />

          {/* Bottom Part */}
          <path
            d="M1.4617 11.6936V8.77018H0V11.6936C0 12.4975 0.657763 13.1553 1.4617 13.1553H4.38509V11.6936H1.4617Z"
            fill={activeElement === "w" ? "#ED1C24" : "#B5B5B5"}
          />
        </svg>
      </button>
    </div>
  );
}

export default IndependentCorners;
