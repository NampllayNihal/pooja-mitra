function Logo({ className = "" }) {
  return (
    <div className={`logo-crop ${className}`}>
      <img
        src="/images/poojamitra-logo.png"
        alt="PoojaMitra"
        className="logo-image"
      />
    </div>
  );
}

export default Logo;