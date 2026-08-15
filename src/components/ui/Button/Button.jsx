import styles from "./Button.module.css";

function Button({
  children,
  as,
  variant = "primary",
  size = "medium",
  ...rest
}) {
  const Component = as || (rest.href ? "a" : "button");

  const className = `
    ${styles.button}
    ${styles[variant]}
    ${styles[size]}
  `;

  const safety =
    rest.target === "_blank" ? { rel: "noopener noreferrer" } : {};

  return (
    <Component className={className} {...safety} {...rest}>
      {children}
    </Component>
  );
}

export default Button;