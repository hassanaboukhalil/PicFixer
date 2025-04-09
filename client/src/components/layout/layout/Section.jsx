const Section = ({
  children,
  className,
  bgColor = "bg-tertiary",
  marginTop = "mt-8",
}) => {
  return (
    <section className={`container ${className} ${bgColor} ${marginTop}`}>
      {children}
    </section>
  );
};
export default Section;
